const monsters = {
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
      },
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
    Rabbit: {
              position: {
                x: 800,
                y: 100
              },
              image: {
                src: './img/Monster-rabbit.png'
              },
              frames: {
                max: 4,
                hold: 30
              },
              animate: true,
              isEnemy: true,
              name: 'Rabbit',
              all_attacks:[attacks.Tackle, attacks.Iceball, attacks.Fireball],
              attacks: [attacks.Tackle, attacks.Iceball],
              element: 'Light',
              level : 5 ,              // Level
              Exp : 10,
              base: [50, 10, 10] ,
              stats: [50, 10, 10],     // HP, ATK, DEF
              current: [50, 10, 10],
              level_up: [5, 1, 2]
            },
    fLY: {
      position: {
        x: 800,
        y: 100
      },
      image: {
        src: './img/fly.png'
      },
      frames: {
        max: 4,
        hold: 30
      },
      animate: true,
      isEnemy: true,
      name: 'fLY',
      all_attacks:[attacks.Tackle, attacks.Iceball, attacks.Fireball],
      attacks: [attacks.Tackle, attacks.Iceball],
      element: 'Dark',
      level : 5 ,              // Level
      Exp : 10,
      base: [50, 10, 10] ,
      stats: [50, 10, 10],     // HP, ATK, DEF
      current: [50, 10, 10],
      level_up: [5, 1, 2]
    },
    Mushroom: {
          position: {
            x: 800,
            y: 100
          },
          image: {
            src: './img/boss-dark.png'
          },
          frames: {
            max: 4,
            hold: 30
          },
          animate: true,
          isEnemy: true,
          name: 'Mushroom',
          all_attacks:[attacks.Tackle, attacks.Iceball, attacks.Fireball],
          attacks: [attacks.Tackle, attacks.Iceball],
          element: 'Dark',
          level : 5 ,              // Level
          Exp : 10,
          base: [50, 10, 10] ,
          stats: [50, 10, 10],     // HP, ATK, DEF
          current: [50, 10, 10],
          level_up: [5, 1, 2]
        },
}

const monsters_area1_forest = {
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

const monsters_area2_port = {
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
}

const monsters_area3_cemetery = {
    Mushroom: {
      position: {
        x: 800,
        y: 100
      },
      image: {
        src: './img/boss-dark.png'
      },
      frames: {
        max: 4,
        hold: 30
      },
      animate: true,
      isEnemy: true,
      name: 'Mushroom',
      all_attacks:[attacks.Tackle, attacks.Iceball, attacks.Fireball],
      attacks: [attacks.Tackle, attacks.Iceball],
      element: 'Dark',
      level : 5 ,              // Level
      Exp : 10,
      base: [50, 10, 10] ,
      stats: [50, 10, 10],     // HP, ATK, DEF
      current: [50, 10, 10],
      level_up: [5, 1, 2]
    },
    fLY: {
          position: {
            x: 800,
            y: 100
          },
          image: {
            src: './img/fly.png'
          },
          frames: {
            max: 4,
            hold: 30
          },
          animate: true,
          isEnemy: true,
          name: 'fLY',
          all_attacks:[attacks.Tackle, attacks.Iceball, attacks.Fireball],
          attacks: [attacks.Tackle, attacks.Iceball],
          element: 'Dark',
          level : 5 ,              // Level
          Exp : 10,
          base: [50, 10, 10] ,
          stats: [50, 10, 10],     // HP, ATK, DEF
          current: [50, 10, 10],
          level_up: [5, 1, 2]
        }
}

const monsters_area4_garden = {
    Rabbit: {
      position: {
        x: 800,
        y: 100
      },
      image: {
        src: './img/Monster-rabbit.png'
      },
      frames: {
        max: 4,
        hold: 30
      },
      animate: true,
      isEnemy: true,
      name: 'Rabbit',
      all_attacks:[attacks.Tackle, attacks.Iceball, attacks.Fireball],
      attacks: [attacks.Tackle, attacks.Iceball],
      element: 'Light',
      level : 5 ,              // Level
      Exp : 10,
      base: [50, 10, 10] ,
      stats: [50, 10, 10],     // HP, ATK, DEF
      current: [50, 10, 10],
      level_up: [5, 1, 2]
    },
}


const monsters_guardian_1 = {
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

const monsters_guardian_2 = {
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
  }
}

const monsters_guardian_3 = {
    Mushroom: {
      position: {
        x: 800,
        y: 100
      },
      image: {
        src: './img/boss-dark.png'
      },
      frames: {
        max: 4,
        hold: 30
      },
      animate: true,
      isEnemy: true,
      name: 'Mushroom',
      all_attacks:[attacks.Tackle, attacks.Iceball, attacks.Fireball],
      attacks: [attacks.Tackle, attacks.Iceball],
      element: 'Dark',
      level : 5 ,              // Level
      Exp : 10,
      base: [50, 10, 10] ,
      stats: [50, 10, 10],     // HP, ATK, DEF
      current: [50, 10, 10],
      level_up: [5, 1, 2]
    }
}

const monsters_guardian_4 = {
    Rabbit: {
      position: {
        x: 800,
        y: 100
      },
      image: {
        src: './img/Monster-rabbit.png'
      },
      frames: {
        max: 4,
        hold: 30
      },
      animate: true,
      isEnemy: true,
      name: 'Rabbit',
      all_attacks:[attacks.Tackle, attacks.Iceball, attacks.Fireball],
      attacks: [attacks.Tackle, attacks.Iceball],
      element: 'Light',
      level : 5 ,              // Level
      Exp : 10,
      base: [50, 10, 10] ,
      stats: [50, 10, 10],     // HP, ATK, DEF
      current: [50, 10, 10],
      level_up: [5, 1, 2]
    }
}