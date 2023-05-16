
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const image = new Image()
image.src = './img/Pellet Town.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png'

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'

const villagerImg = new Image()
villagerImg.src = './img/villager/Idle.png'

const oldManImg = new Image()
oldManImg.src = './img/oldMan/Idle.png'


          //Map-1
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))           // 70 is map size, read js to 70 in a row for Collision
}

const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, 70 + i))     // 70 is map size, read js to 70 in a row for Battle zone
}

const charactersMap = []
for (let i = 0; i < charactersMapData.length; i += 70) {
  charactersMap.push(charactersMapData.slice(i, 70 + i))    // 70 is map size, read js to 70 in a row for NPC
}

const actionMap = []
for (let i = 0; i < actionData.length; i += 70) {
  actionMap.push(actionData.slice(i, 70 + i))    // 70 is map size, read js to 70 in a row for NPC
}
console.log(charactersMap)

const boundaries = []
const offset = {
  x: -735,       //350，-1960
  y: -650
}               //start point

collisionsMap.forEach((row, i) => {                 // read each row , when 10025 to be collision
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})

const battleZones = []

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    let minLevel, maxLevel, mons_list;
    switch (symbol) {
      case 1025:
        minLevel = 5;
        maxLevel = 10;
        mons_list = monsters_1;
        break;
      case 1035:
        minLevel = 10;
        maxLevel = 15;
        mons_list = monsters_2;
        break;
      default:
        break;
    }
    if (minLevel && maxLevel) {
      battleZones.push(
        new BattleZone({
          position: {
            x: j * BattleZone.width + offset.x,
            y: i * BattleZone.height + offset.y
          },
          minLevel,
          maxLevel,
          mons_list
        })
      )
    }
  })
})

const actionZones = []

actionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
      // 1020 === exit
      if (symbol === 1020) {
        actionZones.push(
          new Action({
            position: {
              x: j * Boundary.width + offset.x,
              y: i * Boundary.height + offset.y
            },
            image: oldManImg,
            frames: {
              max: 4,
              hold: 60
            },
            scale: 3,
            animate: true,
            type: 'exit'
          })
        )
      }

  })
})


const characters = []               //NPC

charactersMap.forEach((row, i) => {     //NPC MAP
  row.forEach((symbol, j) => {
    // 1026 === villager
    if (symbol === 1026) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: villagerImg,
          frames: {
            max: 4,
            hold: 60                     // the speed for change image
          },
          scale: 3,
          animate: true,                // let image moving
          dialogue: ['...', 'Hey mister, have you seen my Doggochu?', 'startBattle'],
          minLevel : 5,
          maxLevel : 7,
          mons_list : monsters_2
        })
      )
    }
    // 1031 === oldMan
    else if (symbol === 1031) {
      characters.push(
        new Character({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: oldManImg,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 3,
          dialogue: ['My bones hurt.']
        })
      )
    }

    if (symbol !== 0 && symbol !== 1020) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
    }
  })
})

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 10                        // player moving image
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  }
})

const background = new Sprite({             // map location
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})


const foreground = new Sprite({             // foreground location
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
})
addEventListener('click', () => {
  if (!clicked) {
    audio.Map.play()
    clicked = true
  }
})      //music


//end map_1



const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}





const battle = {
  initiated: false
}



let partnerData = {};

const storedData = JSON.parse(localStorage.getItem("partnerData"));

if (storedData) {
  partnerData = storedData;
  console.log("load save file")
} else {
  // 使用初始数据作为默认值
  partnerData = partners;
  console.log("new game")
}

 const movables = [
    background,
    ...boundaries,
    foreground,
    ...battleZones,
    ...characters,
    ...actionZones
  ]

  const renderables = [
    background,
    ...boundaries,
    ...battleZones,
    ...characters,
    ...actionZones,
    player,
    foreground
  ]





function animate() {


  const animationId = window.requestAnimationFrame(animate)
  renderables.forEach((renderable) => {
    renderable.draw()
  })

  let moving = true
  player.animate = false

  if (battle.initiated) return

  // activate a battle
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i]
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y))
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.1                    //adjust 0.01 can change the chance of fight
      ) {
            console.log(battleZone.mons_list)
            startBattle(battleZone)       //start battle
        break
      }
    }

    for (let i = 0; i < actionZones.length; i++) {
          const actionZone = actionZones[i]
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              actionZone.position.x + actionZone.width
            ) -
              Math.max(player.position.x, actionZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              actionZone.position.y + actionZone.height
            ) -
              Math.max(player.position.y, actionZone.position.y))
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: actionZone
            })
          ) {
                console.log("end game")
                gameOver()
            break
          }
        }
  }

  if (keys.w.pressed && lastKey === 'w') {      //move "up"
    player.animate = true
    player.image = player.sprites.up

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: 3 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3
      })
  } else if (keys.a.pressed && lastKey === 'a') {      //move "left"
    player.animate = true
    player.image = player.sprites.left

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 3, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3
      })
  } else if (keys.s.pressed && lastKey === 's') {           //move "down"
    player.animate = true
    player.image = player.sprites.down

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: -3 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3
      })
  } else if (keys.d.pressed && lastKey === 'd') {       //move "right"
    player.animate = true
    player.image = player.sprites.right

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: -3, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3
      })
  }
}
// animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
  if (player.isInteracting) {
    switch (e.key) {
      case ' ':
        let nextLine = player.interactionAsset.nextDialogue();

        if (nextLine === 'startBattle') {
          player.isInteracting = false;
          startBattle(player.interactionAsset.toBattleZone());
          document.querySelector('#characterDialogueBox').style.display = 'none';
        } else if (nextLine === 'endDialogue') {
          // 对话结束，但不触发战斗
          player.isInteracting = false;
          document.querySelector('#characterDialogueBox').style.display = 'none';
        } else {
          // 如果还有对话，显示下一句
          document.querySelector('#characterDialogueBox').innerHTML = nextLine;
        }
        return;
    }
  }

  switch (e.key) {
    case ' ':
      if (!player.interactionAsset) return

      // beginning the conversation
      const firstMessage = player.interactionAsset.dialogue[0]
      document.querySelector('#characterDialogueBox').innerHTML = firstMessage
      document.querySelector('#characterDialogueBox').style.display = 'flex'
      player.isInteracting = true
      break
    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break
    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break
    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
  }
})

let clicked = false

function startBattle(battleZone) {
    let animationId;
    window.cancelAnimationFrame(animationId)

    audio.Map.stop()
    audio.BattleStart.play()
    audio.battle.play()

    battle.initiated = true
    gsap.to('#overlappingDiv', {                // battle animation
      opacity: 1,
      repeat: 3,
      yoyo: true,
      duration: 0.4,
      onComplete() {
        gsap.to('#overlappingDiv', {
          opacity: 1,
          duration: 0.4,
          onComplete() {
            // activate a new animation loop
            console.log(battleZone.mons_list)
            BattleScene(battleZone.minLevel, battleZone.maxLevel, battleZone.mons_list)       //start battle
            animateBattle()                                             //start battle animate
            gsap.to('#overlappingDiv', {
              opacity: 0,
              duration: 0.4
            })
          }
        })
      }
    })
}

function gameOver() {

  document.getElementById('overlappingDiv').style.display = 'none';
  document.getElementById('characterDialogueBox').style.display = 'none';
  document.getElementById('userInterface').style.display = 'none';

  document.getElementById('endPage').style.display = 'block';
}
