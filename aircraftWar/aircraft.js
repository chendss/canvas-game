class Aircraft extends BaseElement {
  constructor(...args) {
    super(...args)
    this.life = config.airGame.aircraft.life
    this.imgPath = './img/aircraft.png'
    this.name = 'aircraft'
  }

  run = () => {
    if (this.life - this.meetOfNumber <= 0) {
      this.status = 'die'
    }
  }
}