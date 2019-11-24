class Bullet extends Npc {
  constructor(...args) {
    super(...args)
    this.imgPath = './img/bullet.png'
  }

  runExtra = () => {
    if (this.y <= 0) {
      this.status = 'die'
    }
    if (this.life - this.meetOfNumber <= 0) {
      this.status = 'die'
    }
  }
}