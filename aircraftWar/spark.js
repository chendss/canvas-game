class Spark extends Npc {
  constructor(...args) {
    super(...args)
    this.imgPath = './img/spark-2.png'
    this.speedX = randomRange(-20, 20)
    this.speedY = randomRange(-20, 20)
    this.g = 10
  }

  setVxVy = (speedX, speedY) => {
    this.speedX = speedX || this.speedX
    this.speedY = speedY || this.speedY
  }

  move () {
    this.x += this.speedX
    this.y += this.speedY
    // 受到重力影响竖直速度要变化
    this.speedY += this.g * config.fps / 1000
    const boundary = this.boundary
    if (this.y >= this.boundary.y.max) {
      this.status = 'die'
    }
    if (this.x <= 0 || this.x >= boundary.x.max) {
      this.status = 'die'
    }
    if (this.y <= 0 || this.y >= boundary.y.max) {
      this.status = 'die'
    }
  }
}
