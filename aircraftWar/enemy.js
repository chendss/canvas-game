class Enemy extends Npc {
  constructor(...args) {
    super(...args)
    this.imgPath = './img/enemy.png'
    this.life = this.eleConfig.life
    this.dieOfNumber = 0
  }

  init = () => {
    this.reset()
    this.y = this.boundary.y.min
    this.x = randomRange(20, this.boundary.x.max - 20)
    this.dieOfNumber++
  }

  runExtra = () => {
    if (this.y >= this.boundary.y.max) {
      this.init()
    }
    if (this.life - this.meetOfNumber <= 0) {
      this.init()
    }
  }
}