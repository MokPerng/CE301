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
    all_attacks:[attacks.Tackle, attacks.Iceball, attacks.Fireball, attacks.StarAttack, attacks.Darkball],
    attacks: [attacks.Fireball, attacks.Iceball, attacks.StarAttack, attacks.Darkball],
    element: 'Fire',
    level : 5 ,              // Level
    Exp : 10,               // Exp
    base: [70, 50, 10] ,
    stats: [70, 50, 10],     // HP, ATK, DEF
    current: [70, 50, 10],  //continnue HP and stats
    level_up: [5, 1, 1]
  }
}