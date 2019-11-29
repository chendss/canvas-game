class Bird extends BaseMotion {
  constructor(...args) {
    super(...args)
    this.imgPath = ['./img/b1-2.png', './img/b2-2.png', './img/b3-2.png']
    this.vy = config.flappybird.bird.gy
    this.vx = config.flappybird.bird.gx
    this.forward = 1
  }

  direction = (ident = 'left') => {
    if (ident === 'left') {
      this.flipx = true
      this.forward = -1
    } else {
      this.flipx = false
      this.forward = 1
    }
  }

  jump = () => {
    this.vy += -10
    this.rotation = -45
  }

  run = () => {
    this.y += this.vy
    this.y = range(0, config.height - 90, this.y)
    this.x = Math.max(config.width / 4, this.x)
    this.rotation = Math.min(45, this.rotation + 5)
    if (this.life - this.meetOfNumber <= 0) {
      this.status = 'die'
    }
    if (this.vy !== config.flappybird.bird.gy) {
      this.vy = config.flappybird.bird.gy
      this.vx = config.flappybird.bird.gx
    }
  }
}