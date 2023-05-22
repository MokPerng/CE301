class Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1
  }) {
    this.position = position
    this.image = new Image()
    this.frames = { ...frames, val: 0, elapsed: 0 }
    this.image.onload = () => {
      this.width = (this.image.width / this.frames.max) * scale
      this.height = this.image.height * scale
    }
    this.image.src = image.src

    this.animate = animate
    this.sprites = sprites
    this.opacity = 1

    this.rotation = rotation
    this.scale = scale
  }

  draw() {
    c.save()
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )
    c.rotate(this.rotation)
    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    )
    c.globalAlpha = this.opacity

    const crop = {
      position: {
        x: this.frames.val * (this.width / this.scale),
        y: 0
      },
      width: this.image.width / this.frames.max,
      height: this.image.height
    }

    const image = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: this.image.width / this.frames.max,
      height: this.image.height
    }

    c.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      image.position.x,
      image.position.y,
      image.width * this.scale,
      image.height * this.scale
    )

    c.restore()

    if (!this.animate) return

    if (this.frames.max > 1) {
      this.frames.elapsed++
    }

    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val = 0
    }
  }
}

class BattleZone {
  static width = 48
  static height = 48
  constructor({ position, minLevel, maxLevel, mons_list }) {
    this.position = position
    this.width = 48
    this.height = 48
    this.minLevel = minLevel
    this.maxLevel = maxLevel
    this.mons_list = mons_list
  }

  draw() {
    c.fillStyle = 'rgba(150, 0, 0, 0)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

class Boundary {
  static width = 48
  static height = 48
  constructor({ position }) {
    this.position = position
    this.width = 48
    this.height = 48
  }

  draw() {
    c.fillStyle = 'rgba(258, 0, 0, 0)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}


class Action extends Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1,
    type
  }) {
    super({
      position,
      velocity,
      image,
      frames,
      sprites,
      animate,
      rotation,
      scale,
      type
    })
  }
}

class Character extends Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1,
    dialogue = [''],
    minLevel,
    maxLevel,
    mons_list,
    pass,                   //the person, who be defect can touch condition
    hasBattle = false,
    symbol,
    passable = false        //true is can pass this way
  }) {
    super({
      position,
      velocity,
      image,
      frames,
      sprites,
      animate,
      rotation,
      scale
    })

    this.state = 0
    this.dialogue = dialogue
    this.dialogueIndex = 0
    this.minLevel = minLevel
    this.maxLevel = maxLevel
    this.mons_list = mons_list
    this.pass = pass
    this.hasBattle = hasBattle
    this.symbol = symbol
    this.passable = passable

  }

    nextDialogue() {
        let dialogueState = Math.min(this.state, Object.keys(this.dialogue).length - 1);
          let dialogue = this.dialogue[dialogueState];
            console.log("1 = " + dialogue);
          if (this.dialogueIndex < dialogue.length) {
            let line = dialogue[this.dialogueIndex++];

            if (line === 'startBattle') {
              if (!this.hasBattle) {
                return 'startBattle';
              } else {
                this.dialogueIndex = 0;     // close dialogue and reset
                return 'endDialogue';
              }
            } else if (line === 'endDialogue') {
              this.dialogueIndex = 0;       // close dialogue and reset
              // if battle havent end, read next dialogue
              if (!this.hasBattle) {
                this.state++;
              }
              return 'endDialogue';
            } else {
              return line;
            }
          } else {
            this.dialogueIndex = 0;     // close dialogue and reset
            return 'endDialogue';
          }
          }

  toBattleZone() {
    return new BattleZone({
      position: this.position,
      minLevel: this.minLevel,
      maxLevel: this.maxLevel,
      mons_list: this.mons_list
    });
}
}

