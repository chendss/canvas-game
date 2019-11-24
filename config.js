const config = {
  fps: 60,
  width: 500,
  height: 600,
  debug: true,
  blockGame: {
    paddle: {
      speedX: 8,
    },
    ball: {
      speedX: 8,
      speedY: 6
    }
  },
  airGame: {
    airCraft: {
      speedX: 5,
      speedY: 5
    },
    enemy: {
      speedX: 0,
      speedY: 3
    },
    bullet: {
      speedY: -5,
      speedX: 0
    }
  },
  games: {
    block: null,
    air: null,
    flappybird: null
  }
}
