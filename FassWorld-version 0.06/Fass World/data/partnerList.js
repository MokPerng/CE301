const partners = {
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
    all_attacks:[attacks.Tackle, attacks.Iceball, attacks.Fireball],
    attacks: [attacks.Tackle, attacks.Fireball, attacks.Iceball],
    element: "Fire",
    level : 5 ,              // Level
    Exp : 10,               // Exp
    base: [50, 10, 10] ,
    stats: [50, 10, 10],     // HP, ATK, DEF
    current: [50, 10, 10],
    levelup: [5, 3, 3]
  }
}