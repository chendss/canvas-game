class AirNpc extends Npc {
  constructor(...args) {
    super(...args)
    this.life = this.eleConfig.life
    this.dieOfNumber = 0
  }

  init = () => {
    this.reset()
    this.y = this.boundary.y.min
    this.x = randomRange(20, this.boundary.x.max - 20)
    this.dieOfNumber++
  }
}