class Land extends Npc {
  constructor(...args) {
    super(...args)
    this.imgPath = './img/land.png'
  }

  scope(value) { return value }

  wallCollision() { }

  runExtra = () => {
    const len = Math.ceil(config.width / 137) - 1
    const dx = config.width % this.width
    if (this.x <= -this.width) {
      this.x = 544 - dx
    }
  }
}