const monsters = {
  Enemy: {
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
    element: "Fire",
    level : 5  ,             // Level
    Exp : 10,
    base: [50, 10, 10] ,
    stats: [50, 10, 10] ,    // HP, ATK, DEF
    current: [50, 10, 10],
    levelup: [5, 3, 3]
  }
}
