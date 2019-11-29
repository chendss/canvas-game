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
      speedY: 6,
    },
  },
  airGame: {
    aircraft: {
      speedX: 5,
      speedY: 5,
      life: 15000,
      kill: 100, // 碰撞时给予对方的伤害
      coolTime: 3,
    },
    enemy: {
      speedX: 0,
      speedY: 3,
      life: 2,
      number: 8,
    },
    enemyBullet: {
      speedX: 0,
      speedY: 5,
      life: 1,
      coolTime: 60,
    },
    bullet: {
      speedY: -3,
      speedX: 0,
    },
    cloud: {
      speedX: 0,
      speedY: 2,
    },
  },
  flappybird: {
    land: {
      speedX: -3,
      kill: 1
    },
    bird: {
      speedY: 6,
      speedX: -2,
      gy: 2,
      gx: -2,
      coolTime: 2,
    },
    pipe: {
      speedX: -3,
      kill: 1,
      number: 3,
      intervalX: 120,
      intervalY: 200,
    },
  },
  games: {
    block: null,
    air: null,
    flappybird: null,
  },
}
