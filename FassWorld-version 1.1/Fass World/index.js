
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')

    canvas.width = 1024
    canvas.height = 576

    const image = new Image()
    image.src = './img/Big_Map.png'

    const foregroundImage = new Image()
    foregroundImage.src = './img/Big_Map_foreground.png'

    const gate_close = new Image()
    gate_close.src = './img/Big_Map_door_close.png'

    const gate_open = new Image()
    gate_open.src = './img/Big_Map_door_open.png'

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

    const NPC_1 = new Image()
    NPC_1.src = './img/NPC/NPC-1.png'

    const NPC_2 = new Image()
    NPC_2.src = './img/NPC/NPC-2.png'

    const NPC_3 = new Image()
    NPC_3.src = './img/NPC/NPC-3.png'

    const NPC_4 = new Image()
    NPC_4.src = './img/NPC/NPC-4.png'

    const NPC_5 = new Image()
    NPC_5.src = './img/NPC/NPC-5.png'

    const NPC_6 = new Image()
    NPC_6.src = './img/NPC/NPC-6.png'


    let battleCount = 0;
    let animationId;
    let runexit = true;             // can set to false to what condition to game over

              //Map-1
    const collisionsMap = []
    for (let i = 0; i < collisions.length; i += 100) {
      collisionsMap.push(collisions.slice(i, 100 + i))           // 100 is map size, read js to 100 in a row for Collision
    }

    const battleZonesMap = []
    for (let i = 0; i < battleZonesData.length; i += 100) {
      battleZonesMap.push(battleZonesData.slice(i, 100 + i))     // 100 is map size, read js to 100 in a row for Battle zone
    }

    const charactersMap = []
    for (let i = 0; i < charactersMapData.length; i += 100) {
      charactersMap.push(charactersMapData.slice(i, 100 + i))    // 100 is map size, read js to 100 in a row for NPC
    }

    const actionMap = []
    for (let i = 0; i < actionData.length; i += 100) {
      actionMap.push(actionData.slice(i, 100 + i))              // 100 is map size, read js to 100 in a row for NPC
    }
    console.log(charactersMap)

    const offset = {
      x: 320,       //350，-1960 , old one is -735, -650
      y: -1960
    }               //start point

    let playerPosition = offset
    console.log(playerPosition)
    let passablePositions = new Set();

    let boundaries = []

    collisionsMap.forEach((row, i) => {                 // read each row , when 1025 to be collision
      row.forEach((symbol, j) => {
        if (symbol === 88)
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
          case 340:
            minLevel = 5;
            maxLevel = 10;
            mons_list = monsters_area2_port;
            break;
          case 212:
            minLevel = 9;
            maxLevel = 15;
            mons_list = monsters_area1_forest;
            break;
          case 468:
             minLevel = 13;
             maxLevel = 18;
             mons_list = monsters_area3_cemetery;
             break;
         case 471:
            minLevel = 15;
            maxLevel = 20;
            mons_list = monsters_area4_garden;
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

    let actionZones = []        //exit

    actionMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
          // 857 === exit
          if (symbol === 857) {
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
                animate: false,
                type: 'exit'
              })
            )
          }
      })
    })

    let characters = []               //NPC

    charactersMap.forEach((row, i) => {     //NPC MAP
      row.forEach((symbol, j) => {
        //468 for gate
        if (symbol === 468) {
              characters.push( new Character({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y },
                    image: oldManImg, frames: { max: 4, hold: 60 }, scale: 2.5, animate: false,
                    dialogue: { 0: ['Stop!', 'If you are not get the four guardian approved, you can not go in!', 'endDialogue'] },
                    type: 'gate',
                    passable : false,
                    symbol : 468
                    })
              ) }


        // 365 === guardian 1
        else if (symbol === 365) {
          characters.push( new Character({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y },
              image: NPC_2, frames: { max: 4, hold: 120}, scale: 1, animate: true,                // let image moving
              dialogue: { 0: ['...', 'Hey mister, have you seen my no1 ?', 'startBattle'],
                          1: ['I am busy right now.', 'endDialogue'],
                          2: ['Please leave me alone.', 'endDialogue']
                        },
              minLevel : 5, maxLevel : 7,
              mons_list : monsters_guardian_1, hasBattle : false,
              pass : true,
              passable : false,
            })
          ) }

        // 366 === guardian 2
        else if (symbol === 366) {
          characters.push( new Character({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y },
              image: NPC_3, frames: { max: 4, hold: 120}, scale: 1, animate: true,                // let image moving
              dialogue: { 0: ['...', 'Hey mister, have you seen my no2 ?', 'startBattle'],
                          1: ['I am busy right now.', 'endDialogue'],
                          2: ['Please leave me alone.', 'endDialogue']
                        },
              minLevel : 9, maxLevel : 10,
              mons_list : monsters_guardian_2, hasBattle : false,
              pass : true,
              passable : false,
            })
          ) }

        // 367 === guardian 3
        else if (symbol === 367) {
          characters.push( new Character({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y },
              image: NPC_2, frames: { max: 4, hold: 120}, scale: 1, animate: true,                // let image moving
              dialogue: { 0: ['...', 'Hey mister, have you seen my no3 ?', 'startBattle'],
                          1: ['I am busy right now.', 'endDialogue'],
                          2: ['Please leave me alone.', 'endDialogue']
                        },
              minLevel : 12, maxLevel : 13,
              mons_list : monsters_guardian_3, hasBattle : false,
              pass : true,
              passable : false,
            })
          ) }

        // 368 === guardian 4
        else if (symbol === 368) {
          characters.push( new Character({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y },
              image: NPC_3, frames: { max: 4, hold: 120}, scale: 1, animate: true,                // let image moving
              dialogue: { 0: ['Welcome', 'I am the Light Guardian.', 'startBattle'],
                          1: ['Congratulation you get my approved.', 'endDialogue']
                        },
              minLevel : 14, maxLevel : 15,
              mons_list : monsters_guardian_4, hasBattle : false,
              pass : true,
              passable : false,
            })
          ) }

        // 400 === trainner
        else if (symbol === 400) {
          characters.push( new Character({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y },
              image: NPC_4, frames: { max: 4, hold: 120}, scale: 1, animate: true,                // let image moving
              dialogue: { 0: ['Are you also a trainner?', 'let me see how is your partner!', 'startBattle'],
                          1: ['Your partner are strong!', 'endDialogue'],
                        },
              minLevel : 5, maxLevel : 6,
              mons_list : monsters, hasBattle : false,
              passable : false,
            })
          ) }

        // 472 === NPC
        else if (symbol === 472) {
          characters.push( new Character({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y },
              image: NPC_5, scale: 1, passable : false,
                dialogue: { 0: ['Hello.', 'endDialogue'],
                            1: ['I am busy right now.', 'endDialogue'],
                            2: ['Please leave me alone.', 'endDialogue']
                          },
            })  ) }

        // 474 === NPC(explain)
        else if (symbol === 474) {
          characters.push( new Character({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y },
              image: NPC_5, scale: 1, passable : false,
                dialogue: { 0: ['Go up is cemetery.', 'We always leave that away.', 'it is scary there.', 'endDialogue'],
                            1: ['Have a guardian always protect the cemetery.', 'endDialogue'],
                          },
            })  ) }

        // 473 === village
        else if (symbol === 473) {
          characters.push( new Character({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y },
              image: NPC_6, scale: 1, passable : false,
                dialogue: { 0: ['Today have is a nice day', 'Is good time for sleep', 'endDialogue'],
                            1: ['zzZ...zzZ...zzZ', 'endDialogue']
                          },
            })  ) }

        //let all character cant way pass
        if (symbol !== 0) {
          let posString = `${j * Boundary.width + offset.x},${i * Boundary.height + offset.y}`;
          if (!passablePositions.has(posString)){
          boundaries.push(
            new Boundary({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y} })
          )}
        }
      })
    })

        characters.forEach(character => {
          console.log(character.passable);
        });

        for (let i = 0; i < characters.length; i++) {
            const character = characters[i]
            console.log(character.passable);
        }

    const player = new Sprite({
      position: {
        x: (canvas.width / 2 - 192 / 4 / 2),
        y: (canvas.height / 2 - 68 / 2)
      },
      image: playerDownImage,
      frames: {
        max: 4,
        hold: 10                        // player moving image
      },
      scale: .7,
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

    let foreground = new Sprite({             // foreground location
      position: {
        x: offset.x,
        y: offset.y
      },
      image: foregroundImage
    })

    let gate = new Sprite({             // foreground location
      position: {
        x: offset.x,
        y: offset.y
      },
      image: gate_close
    })

    addEventListener('click', () => {
      if (!clicked) {
        audio.Map.play()
        clicked = true
      }
    })      //music


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

    let storedData = JSON.parse(localStorage.getItem("partnerData"));

    if (storedData) {
      partnerData = storedData;
      console.log("load save file")
    } else {
      // default
      partnerData = partners;
      console.log("new game")
    }

     let movables = [
        background,
        ...boundaries,
        foreground,
        ...battleZones,
        ...characters,
        ...actionZones,
        gate
      ]

      let renderables = [
        background,
        ...boundaries,
        ...battleZones,
        ...characters,
        ...actionZones,
        player,
        foreground,
        gate
      ]

    function startGeneration() {

      runexit = true

      // search each symbol
      characters = characters.map(character => {
        // if symbol === 468, will run below
        if (character.symbol === 468) {
          character.passable = true;
          character.scale = 0.1;
        }
        // return
        return character;
      });

      boundaries = boundaries.filter(boundary => {
        for (let character of characters) {
          if (character.passable && boundary.position.x === character.position.x && boundary.position.y === character.position.y) {
            return false; // to check in boundaries
          }
        }
        return true;
      });

      gate.image = gate_open;

      movables = [
        background,
        ...boundaries,
        ...battleZones,
        ...characters,
        ...actionZones,
        gate
      ]

      renderables = [
        background,
        ...boundaries,
        ...battleZones,
        ...characters,
        ...actionZones,
        player,
        gate
      ]

    }

    function animate() {

      animationId = window.requestAnimationFrame(animate)
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
            Math.random() < 0.007                    //adjust 0.007 can change the chance of fight
          ) {
                console.log(battleZone.mons_list)
                startBattle(battleZone)       //start battle
            break
          }
        }

        if (runexit == true) {
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
      }

      if (keys.w.pressed && lastKey === 'w') {      //move "up"
        player.animate = true
        player.image = player.sprites.up

        checkForCharacterCollision({ characters, player, characterOffset: { x: 0, y: 3 } })
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

        if (moving) {
          movables.forEach((movable) => {
            movable.position.y += 3
          })
            playerPosition.y -= 3
          }
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

        if (moving){
          movables.forEach((movable) => {
            movable.position.x += 3
          })
          playerPosition.x -= 3
          }
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

        if (moving) {
          movables.forEach((movable) => {
            movable.position.y -= 3
          })
          playerPosition.y += 3
           }
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

        if (moving){
          movables.forEach((movable) => {
            movable.position.x -= 3
          })
          playerPosition.x += 3
            }
      }
    }
    // animate()

    let lastKey = ''
    window.addEventListener('keydown', (e) => {
      if (player.isInteracting) {
        switch (e.key) {
          case ' ':

            let nextLine = player.interactionAsset.nextDialogue();
                console.log("down " + nextLine)
            if (nextLine === 'startBattle') {
              player.isInteracting = false;
              startBattle(player.interactionAsset.toBattleZone());
              document.querySelector('#characterDialogueBox').style.display = 'none';
              player.interactionAsset.dialogueIndex = 0;
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
          let nextLine = player.interactionAsset.nextDialogue();
              console.log("up " + nextLine)
          document.querySelector('#characterDialogueBox').innerHTML = nextLine
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
      document.getElementById('gameplay').style.display = 'none';

      document.getElementById('endPage').style.display = 'block';
    }
