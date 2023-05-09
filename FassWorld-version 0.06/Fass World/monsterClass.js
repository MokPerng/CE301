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
    levelup
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
    this.Expbar = level * 50
    this.stats = stats;
    this.current = current;
    this.levelup = levelup;
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

  levelUp() {
      this.level += 1;
    }

  gainExperience(exp) {
      this.Exp += exp;
      console.log(this.Exp);
      const afterExp = this.Exp / (this.level * 50);
      document.querySelector("#ExpBar").style.width = afterExp + "%";
      console.log(this.Exp);
      while (this.Exp >= this.level * 50) {
        this.Exp -= this.level * 50;
        this.levelUp();
      }
    }

  updateHealth(damage) {
    this.health -= damage;
    this.health = Math.max(this.health, 0);

    if (this.isEnemy) {
      const percentage = (this.health / this.stats[0]) * 100;
      document.querySelector("#enemyHealthBar").style.width = percentage + "%";
    } else {
      const percentage = (this.health / this.stats[0]) * 100;
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

    const damageMultiplier = 1.2;

    const damage = Math.round(attack.damage + this.stats[1]) * damageMultiplier;

    recipient.updateHealth(damage);

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

        tl.to(this.position, {
          x: this.position.x - movementDistance
        })
          .to(this.position, {
            x: this.position.x + movementDistance * 2, duration: 0.1,
            onComplete: () => {
              // Enemy actually gets hit
              audio.beHit.play()

              gsap.to(recipient.position, {
                x: recipient.position.x + 10,repeat: 5,duration: 0.08,yoyo: true
              })

              gsap.to(recipient, {
                opacity: 0,repeat: 5,duration: 0.08,yoyo: true
              })
            }
          })
          .to(this.position, {
            x: this.position.x
          })

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

    }
  }
}
