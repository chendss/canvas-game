class Bullet extends Npc {
  constructor(...args) {
    super(...args)
    this.imgPath = 'img/bullet.png'
  }

  meetObstacles () {
    super.meetObstacles(() => {
      log('a')
      this.status = 'die'
    })
  }

  runExtra = () => {
    if (this.y <= 0) {
      this.status = 'die'
    }
  }
}