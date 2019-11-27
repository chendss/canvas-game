class Land extends Npc {
  constructor(...args) {
    super(...args)
    this.imgPath = './img/land.png'
  }

  wallCollision () { }

  runExtra = () => {
    if (this.x <= 0) {
      this.x = config.width - this.width
    }
  }
}