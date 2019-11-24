class Cloud extends AirNpc {
  constructor(...args) {
    super(...args)
    this.imgPath = './img/cloud.png'
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