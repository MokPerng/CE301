const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleBackground.png'
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  image: battleBackgroundImage
})

let enemy
let partner
let renderedSprites
let battleAnimationId
let queue

function BattleScene(minLevel, maxLevel, mons_list) {
  document.querySelector('#userInterface').style.display = 'block'
  document.querySelector('#dialogueBox').style.display = 'none'
  document.querySelector('#enemyHealthBar').style.width = '100%'
  document.querySelector('#partnerHealthBar').style.width = '100%'
  document.querySelector('#attacksBox').replaceChildren()

  //random to choose monster from monsterlist
  console.log(mons_list);
  this.mons_list = mons_list
  const monsterKeys = Object.keys(mons_list);
  const randomMonsterKey = monsterKeys[Math.floor(Math.random() * monsterKeys.length)];
  const randomMonster = mons_list[randomMonsterKey];
  const randomLevel = Math.floor(Math.random() * (maxLevel - minLevel + 1)) + minLevel;
  const levelDiff = randomLevel - 5;

    const monsterFight = {}
    const monsterFightKeys = Object.keys(monsterFight)
    monsterFight[monsterFightKeys] = randomMonster
    console.log(randomMonster)

    if (levelDiff > 0) {
      randomMonster.level = randomLevel
      randomMonster.stats = randomMonster.base.map((base, index) => base + randomMonster.level_up[index] * levelDiff),
      randomMonster.current = randomMonster.stats
    }
  console.log(randomMonster)

  const partnerKeys = Object.keys(partnerData);
  const partnerChoose = partnerKeys[0];         //what partner you choose

  enemy = new Monster(randomMonster)
  partner = new Monster(partnerData[partnerChoose])



  //name for enemy and partner
  document.querySelector('#enemyName').innerHTML = enemy.name     //show name
  document.querySelector('#enemyLevel').innerHTML = "Level "+enemy.level

  document.querySelector('#partnerName').innerHTML = partner.name       //show name
  document.querySelector('#HPValue').innerHTML = partner.current[0]
  document.querySelector('#HPValue_full').innerHTML = partner.stats[0]  //partner full hp
  document.querySelector('#partnerLevel').innerHTML = "Level "+partner.level

  renderedSprites = [enemy, partner]
  queue = []

  partner.attacks.forEach((attack) => {
    const button = document.createElement('button')
    button.innerHTML = attack.name
    document.querySelector('#attacksBox').append(button)
  })

  // what attack we choose
  document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML]
      partner.attack({
        attack: selectedAttack,
        recipient: enemy,
        renderedSprites
      })

      //enemy faint check
      if (enemy.health <= 0) {

        queue.push(() => {
          document.querySelector('#dialogueBox').innerHTML = enemy.name + ' fainted!'
          enemy.faint()
          // can add more about victory
        })

        queue.push(() => {
          Exp_get = enemy.level * 10     // exp system can be change
          document.querySelector('#dialogueBox').innerHTML = partner.name + ' get ' + Exp_get + ' Exp '
          // can add more about victory
        })

        queue.push(() => {
          partner.gainExperience(Exp_get);
          if (player.interactionAsset instanceof Character) {
          player.interactionAsset.hasBattle = true;
          player.interactionAsset.state++;
            console.log(battleCount)
            console.log(player.interactionAsset.pass)
          if (player.interactionAsset.pass) { // check is character is pass than run this
                console.log("check before : " +battleCount);
                battleCount++;
                console.log("check after : " +battleCount);
              }
          }

          if (battleCount === 4) {          //this is win condition
                 startGeneration();
               }
          // can add more about victory
        })

        queue.push(() => {
          // effect for monster disappear
          gsap.to('#overlappingDiv', {          //gsap is effect command
            opacity: 1,

            onComplete: () => {
              cancelAnimationFrame(battleAnimationId)
              animate()
              document.querySelector('#userInterface').style.display = 'none'

              gsap.to('#overlappingDiv', {
                opacity: 0
              })

              gsap.to(enemy.position, {
                y: enemy.position.y - 20
              })

              battle.initiated = false
              audio.Map.play()
            }
          })
        })
      }

      // enemy random attack choose
      const randomAttack =
        enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)]

      queue.push(() => {
        enemy.attack({                      //run attack function
          attack: randomAttack,
          recipient: partner,
          renderedSprites
        })

        //partner faint check
        if (partner.health <= 0) {
          enemy.isMarked = true;

          queue.push(() => {
            document.querySelector('#dialogueBox').innerHTML = partner.name + ' fainted!'
            partner.faint()
          if (player.interactionAsset instanceof Character) {
          player.interactionAsset.hasBattle = false;
          }
            // can add more about lose
          })

        queue.push(() => {
          document.querySelector('#dialogueBox').innerHTML = "Please try again."
              gsap.to(partner.position, {
                y: partner.position.y - 20
              })
          // can add more about defect
        })

          queue.push(() => {
            // fade back to black
            gsap.to('#overlappingDiv', {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationId)
                animate()
                document.querySelector('#userInterface').style.display = 'none'

                gsap.to('#overlappingDiv', {
                  opacity: 0
                })

                battle.initiated = false
                audio.Map.play()
              }
            })
          })
        }
    })
    })

    button.addEventListener('mouseenter', (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML]
      document.querySelector('#attackType').innerHTML = selectedAttack.type
      document.querySelector('#attackType').style.color = selectedAttack.color
    })
    })

  if (battle.initiated) return;
  battle.initiated = true;
}

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle)
  battleBackground.draw()

  //console.log(battleAnimationId)

  renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
}

animate()
// BattleScene()
// animateBattle()

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = 'none'
})
