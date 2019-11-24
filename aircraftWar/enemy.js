class Enemy extends Npc {
  constructor(...args) {
    super(...args)
    this.imgPath = 'img/enemy.png'
  }

  runExtra = () => {
    if (this.y >= this.boundary.y.max) {
      this.y = this.boundary.y.min
      this.x = randomRange(100, this.boundary.x.max - 100)
    }
  }
}