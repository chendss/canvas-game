class Land extends Npc {
  constructor(...args) {
    super(...args)
    this.imgPath = './img/land.png'
  }

  scope (value) { return value }

  wallCollision () { }

  runExtra = () => {
    const w = 137
    const len = Math.ceil(config.width / w)
    if (this.x <= -this.width) {
      this.x = (len + 1) * w + this.x
    }
  }
}