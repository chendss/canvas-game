class Bird extends BaseElement {
  constructor(...args) {
    super(...args)
    this.imgPath = './img/bird.png'
  }

  run = () => {
    this.y += config.flappybird.bird.g
    if (this.y >= this.boundary.y.max) {
      // this.status = 'die'
    }
  }
}