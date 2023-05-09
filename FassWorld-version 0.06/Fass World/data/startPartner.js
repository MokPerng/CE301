const startPartners = {
  Emby: {
    position: {
      x: 280,
      y: 325
    },
    image: {
      src: './img/embySprite.png'
    },
    frames: {
      max: 4,
      hold: 30
    },
    animate: true,
    name: 'Emby',
    attacks: [attacks.Tackle, attacks.Fireball]
    //stats: [50, 10, 10]   // HP, ATK, DEF
  },
  Draggle: {
    position: {
      x: 280,
      y: 325
    },
    image: {
      src: './img/draggleSprite.png'
    },
    frames: {
      max: 4,
      hold: 30
    },
    animate: true,
    name: 'Draggle',
    attacks: [attacks.Tackle, attacks.Iceball]
    //stats: [50, 10, 10]   // HP, ATK, DEF
  }
}