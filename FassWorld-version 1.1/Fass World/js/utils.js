function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width-15 >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width-15 &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height-20 &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

function checkForCharacterCollision({
  characters,
  player,
  characterOffset = { x: 0, y: 0 }
}) {
  player.interactionAsset = null
  // monitor for character collision
  for (let i = 0; i < characters.length; i++) {
    const character = characters[i]

    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...character,
          position: {
            x: character.position.x + characterOffset.x,
            y: character.position.y + characterOffset.y
          }
        }
      })
    ) {
    console.log("Collided with character!");
      player.interactionAsset = character
      break
    }
  }
}

