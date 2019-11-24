class Enemy extends AirNpc {
  constructor(...args) {
    super(...args)
    this.imgPath = './img/enemy.png'
    this.life = this.eleConfig.life
    this.dieOfNumber = 0
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