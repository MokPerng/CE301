class Monster extends Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = false,
    name,
    all_attacks,
    attacks,
    element,
    level,
    Exp,
    base,
    stats,
    current,
    level_up
  }) {
    super({
      position,
      velocity,
      image,
      frames,
      sprites,
      animate,
      rotation
    })

    this.health = stats[0]
    this.healthMax = stats[0]
    this.isEnemy = isEnemy
    this.name = name
    this.attacks = attacks;
    this.level = level;
    this.Exp = Exp;
    this.element = element;
    this.stats = stats;
    this.current = current;
    this.level_up = level_up;
    this.state = 0;
    console.log(this.Exp);
    const beforeExp = (this.Exp / (this.level * 50))*100;
    document.querySelector("#ExpBar").style.width = beforeExp + "%"
  }

  faint() {
    gsap.to(this.position, {
      y: this.position.y + 20
    })
    gsap.to(this, {
      opacity: 0
    })
    audio.battle.stop()
    audio.battleend.play()
  }

    interact() {
      return 'startBattle';
    }

  levelUp() {
      const partnerKeys = Object.keys(partnerData);
      const partnerChoose = partnerKeys[0];
      this.level += 1;
      document.querySelector('#partnerLevel').innerHTML = "Level "+this.level
      partnerData[partnerChoose].level = this.level
      partnerData[partnerChoose].stats = partnerData[partnerChoose].stats.map((stat, index) => stat + partnerData[partnerChoose].level_up[index])
      partnerData[partnerChoose].current = partnerData[partnerChoose].current.map((stat, index) => stat + partnerData[partnerChoose].level_up[index])
    }

  gainExperience(exp) {
      const partnerKeys = Object.keys(partnerData);
      const partnerChoose = partnerKeys[0];

      this.Exp += exp;
      partnerData[partnerChoose].Exp = this.Exp;
      //console.log(partnerData[partnerChoose].Exp);
      const afterExp = (this.Exp / (this.level * 50))*100;
      document.querySelector("#ExpBar").style.width = afterExp + "%";
      //console.log(this.Exp);
      while (this.Exp >= this.level * 50) {
        document.querySelector('#dialogueBox').innerHTML = partner.name + ' Level up! '
        this.Exp -= this.level * 50;
        partnerData[partnerChoose].Exp = this.Exp;
        this.levelUp();
        afterExp = (this.Exp / (this.level * 50))*100;
        document.querySelector("#ExpBar").style.width = afterExp + "%";
      }
    }

  updateHealth(damage) {
    const partnerKeys = Object.keys(partnerData);
    const partnerChoose = partnerKeys[0];

    this.health -= damage;
    this.health = Math.max(this.health, 0);

    if (this.isEnemy) {
    console.log(this.health, this.stats[0])
      const percentage = (this.health / this.stats[0]) * 100;
      document.querySelector("#enemyHealthBar").style.width = percentage + "%";
    } else {
      const percentage = (this.health / partnerData[partnerChoose].stats[0]) * 100;
      document.querySelector("#partnerHealthBar").style.width = percentage + "%";
      document.querySelector("#HPValue").innerHTML = Math.round(this.health);
    }
  }

  attack({ attack, recipient, renderedSprites }) {
    document.querySelector('#dialogueBox').style.display = 'block'
    document.querySelector('#dialogueBox').innerHTML =
      this.name + ' used ' + attack.name

    let rotation = 1
    if (this.isEnemy) rotation = -2.2

    let damageMultiplier_recipient = 1;
    let damageMultiplier_Attack = 1;
    let damageMultiplier_sameelement = 1;

    if (this.element === attack.type)           //increase when enemy use their element attack
        { damageMultiplier_Attack = 1.2 }

    if (attack.type === recipient.element)      //decrease when enemy receive their element attack
        { damageMultiplier_sameelement = 0.8 }

    if ((attack.type === 'Fire' && recipient.element === 'Water') ||
        (attack.type === 'Water' && recipient.element === 'Fire') ||
        (attack.type === 'Light' && recipient.element === 'Dark') ||
        (attack.type === 'Dark' && recipient.element === 'Light'))
        { damageMultiplier_recipient = 1.2 }      //increase when enemy receive their hate element

    console.log('Attacker element: ', this.element);
    console.log('Attack type: ', attack.type);
    console.log('Recipient element: ', recipient.element);
    console.log('Attack damage: ', attack.damage);
    console.log('Attacker attack stat: ', this.stats[1]);
    console.log('Recipient defense stat: ', recipient.stats[2]);         //check

    const damage = (Math.round(attack.damage + this.stats[1]) *
                    damageMultiplier_recipient *
                    damageMultiplier_Attack *
                    damageMultiplier_sameelement) - recipient.stats[2];

    console.log('damage : ' +damage)
    console.log('damage when skill and attacker have same element will + 20% damage : ' +damageMultiplier_Attack)
    console.log('damage when skill and recipient have will +20% damage : ' +damageMultiplier_recipient)
    console.log('damage when skill and recipient have same element will -20% damage : ' +damageMultiplier_sameelement)       //check

    // !!! can add a dodge calculate here !!!

    recipient.updateHealth(damage);                 //update Health after attack

    switch (attack.name) {
      case 'Fireball':
        audio.Fireball.play()
        const fireballImage = new Image()
        fireballImage.src = './img/fireball.png'
        const fireball = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y
          },
          image: fireballImage,
          frames: {
            max: 4,
            hold: 10
          },
          animate: true,
          rotation
        })
        renderedSprites.splice(1, 0, fireball)

        gsap.to(fireball.position, {
          x: recipient.position.x, y: recipient.position.y,
            onComplete: () => {           // Enemy actually gets hit
            audio.magicHit.play()

            gsap.to(recipient.position, {
              x: recipient.position.x + 10,repeat: 5,duration: 0.08,yoyo: true
            })

            gsap.to(recipient, {
              opacity: 0,repeat: 5,duration: 0.08,yoyo: true
            })
            renderedSprites.splice(1, 1)
          }
        })

        break
      case 'Tackle':
        const tl = gsap.timeline()

        let movementDistance = 20
        if (this.isEnemy) movementDistance = -20

        tl.to(this.position, { x: this.position.x - movementDistance })
          .to(this.position, { x: this.position.x + movementDistance * 2, duration: 0.1,
            onComplete: () => {
              // Enemy actually gets hit
              audio.beHit.play()
              gsap.to(recipient.position, { x: recipient.position.x + 10,repeat: 5,duration: 0.08,yoyo: true })
              gsap.to(recipient, { opacity: 0,repeat: 5,duration: 0.08,yoyo: true })
            }
          })
          .to(this.position, { x: this.position.x })

        break
      case 'Iceball':
        audio.Iceball.play()
        const iceballImage = new Image()
        iceballImage.src = './img/fireball.png'
        const iceball = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y
          },
          image: iceballImage,
          frames: {
            max: 4,
            hold: 10
          },
          animate: true,
          rotation
        })
        renderedSprites.splice(1, 0, iceball)

        gsap.to(iceball.position, {
          x: recipient.position.x, y: recipient.position.y,
          onComplete: () => {
            // Enemy actually gets hit

            gsap.to(recipient.position, {
              x: recipient.position.x + 10,repeat: 5,duration: 0.08,yoyo: true
            })

            gsap.to(recipient, {
              opacity: 0,repeat: 5,duration: 0.08,yoyo: true
            })
            renderedSprites.splice(1, 1)
          }
        })

        break

      case 'StarAttack':
        audio.Iceball.play()
        const starlImage = new Image()
        starlImage.src = './img/fireball.png'
        const starattack = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y
          },
          image: starlImage,
          frames: {
            max: 4,
            hold: 10
          },
          animate: true,
          rotation
        })
        renderedSprites.splice(1, 0, starattack)

        gsap.to(starattack.position, {
          x: recipient.position.x, y: recipient.position.y,
          onComplete: () => {
            // Enemy actually gets hit

            gsap.to(recipient.position, {
              x: recipient.position.x + 10,repeat: 5,duration: 0.08,yoyo: true
            })

            gsap.to(recipient, {
              opacity: 0,repeat: 5,duration: 0.08,yoyo: true
            })
            renderedSprites.splice(1, 1)
          }
        })

        break

      case 'Darkball':
        audio.Iceball.play()
        const darkballImage = new Image()
        darkballImage.src = './img/fireball.png'
        const darkball = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y
          },
          image: darkballImage,
          frames: {
            max: 4,
            hold: 10
          },
          animate: true,
          rotation
        })
        renderedSprites.splice(1, 0, darkball)

        gsap.to(darkball.position, {
          x: recipient.position.x, y: recipient.position.y,
          onComplete: () => {
            // Enemy actually gets hit

            gsap.to(recipient.position, {
              x: recipient.position.x + 10,repeat: 5,duration: 0.08,yoyo: true
            })

            gsap.to(recipient, {
              opacity: 0,repeat: 5,duration: 0.08,yoyo: true
            })
            renderedSprites.splice(1, 1)
          }
        })

        break

    }
  }
}
