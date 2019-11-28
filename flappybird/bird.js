class Bird extends BaseMotion {
  constructor(...args) {
    super(...args)
    this.imgPaths = ['./img/b1-2.png', './img/b2-2.png', './img/b3-2.png']
    this.vy = config.flappybird.bird.gy
    this.vx = config.flappybird.bird.gx
  }

  direction = (ident = 'left') => {
    if (ident === 'left') {
      this.flipx = true
    } else {
      this.flipx = false
    }
  }

  jump = () => {
    this.vy += -10
    this.rotation = -45
  }

  run = (gameContent) => {
    this.y += this.vy
    this.y = Math.min(config.height - 90, this.y)
    this.x = Math.max(config.width / 4, this.x)
    if (this.life - this.meetOfNumber <= 0) {
      this.status = 'die'
    }
    if (this.vy !== config.flappybird.bird.gy) {
      this.vy = config.flappybird.bird.gy
      this.vx = config.flappybird.bird.gx
    }
  }
}