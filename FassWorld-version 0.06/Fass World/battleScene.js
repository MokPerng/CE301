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

function BattleScene() {
  document.querySelector('#userInterface').style.display = 'block'
  document.querySelector('#dialogueBox').style.display = 'none'
  document.querySelector('#enemyHealthBar').style.width = '100%'
  document.querySelector('#partnerHealthBar').style.width = '100%'
  document.querySelector('#attacksBox').replaceChildren()

  //random to choose monster from monsterlist
  const monsterKeys = Object.keys(monsters);
  const randomMonsterKey = monsterKeys[Math.floor(Math.random() * monsterKeys.length)];
  const randomMonster = monsters[randomMonsterKey];

  const minLevel = 5;
  const maxLevel = 6; // can set max level
  const randomLevel = Math.floor(Math.random() * (maxLevel - minLevel + 1)) + minLevel;
  const levelDiff = randomLevel - minLevel;

    const monsterFight = {}
    const monsterFightKeys = Object.keys(monsterFight)
    monsterFight[monsterFightKeys] = randomMonster

    if (levelDiff > 0) {
      randomMonster.level = randomLevel
      randomMonster.stats = randomMonster.stats.map((stat, index) => stat + randomMonster.levelup[index] * levelDiff),
      randomMonster.current = randomMonster.stats
    }

  const partnerKeys = Object.keys(partners);
  const partnerChoose = partnerKeys[0];         //what partner you choose

  enemy = new Monster(randomMonster)
  partner = new Monster(partners[partnerChoose])



  //name for enemy and partner
  document.querySelector('#enemyName').innerHTML = enemy.name     //show name
  document.querySelector('#enemyLevel').innerHTML = "Level "+enemy.level

  document.querySelector('#partnerName').innerHTML = partner.name       //show name
  document.querySelector('#HPValue').innerHTML = partner.current[0]
  document.querySelector('#HPValue_full').innerHTML = partner.stats[0]  //partner full hp
  document.querySelector('#partnerLevel').innerHTML = "Level "+partner.level
  const beforeExp = this.Exp / (this.level * 50);
  document.querySelector("#ExpBar").style.width = beforeExp + "%"
  console.log(partner.Exp)
  console.log((partner.Exp / (partner.level*50)) + "%")

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

      if (enemy.health <= 0) {      //enemy faint check
        queue.push(() => {
          document.querySelector('#dialogueBox').innerHTML = enemy.name + ' fainted!'
          enemy.faint()
          Exp_get = enemy.level * 5     // exp system can be change
          document.querySelector('#dialogueBox').innerHTML = partner.name + ' get ' + Exp_get + ' Exp '
          partner.gainExperience(Exp_get);

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

        if (partner.health <= 0) {          //partner faint check
          queue.push(() => {
            document.querySelector('#dialogueBox').innerHTML = partner.name + ' fainted!'
            partner.faint()
            // can add more about lose
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
