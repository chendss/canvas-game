class Block extends BaseElement {
  constructor(...args) {
    super(...args)
    this.imgPath = 'img/block.png'
  }

  run = () => {
    if (this.life - this.meetOfNumber <= 0) {
      this.status = 'die'
    }
  }
}