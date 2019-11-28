class Pipe extends Npc {
  constructor(...args) {
    super(...args)
    this.imgPath = './img/pipe.png'
  }

  scope (value) { return value }

  wallCollision () { }

  runExtra = () => {
    if (this.x + this.width <= 0) {
      this.status = 'die'
    }
  }
}