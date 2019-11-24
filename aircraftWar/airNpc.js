class AirNpc extends Npc {
  constructor(...args) {
    super(...args)
  }

  init = () => {
    this.reset()
    this.y = this.boundary.y.min
    this.x = randomRange(20, this.boundary.x.max - 20)
  }
}