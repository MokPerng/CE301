const monsters = {
  Emby: {
    position: {
      x: 800,
      y: 100
    },
    image: {
      src: './img/embySprite.png'
    },
    frames: {
      max: 4,
      hold: 30
    },
    animate: true,
    isEnemy: true,
    name: 'Emby',
    all_attacks:[attacks.Tackle, attacks.Fireball, attacks.Iceball],
    attacks: [attacks.Tackle, attacks.Fireball],
    element: 'Fire',
    level : 5  ,             // Level
    Exp : 10,
    base: [50, 10, 10] ,
    stats: [50, 10, 10] ,    // HP, ATK, DEF
    current: [50, 10, 10],
    level_up: [5, 1, 1]
  },
  Draggle: {
    position: {
      x: 800,
      y: 100
    },
    image: {
      src: './img/draggleSprite.png'
    },
    frames: {
      max: 4,
      hold: 30
    },
    animate: true,
    isEnemy: true,
    name: 'Draggle',
    all_attacks:[attacks.Tackle, attacks.Iceball, attacks.Fireball],
    attacks: [attacks.Tackle, attacks.Iceball],
    element: 'Water',
    level : 5 ,              // Level
    Exp : 10,
    base: [50, 10, 10] ,
    stats: [50, 10, 10],     // HP, ATK, DEF
    current: [50, 10, 10],
    level_up: [5, 1, 1]
  }
}
