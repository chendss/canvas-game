class Ball extends Npc {
  constructor(...args) {
    super(...args)
    this.imgPath = 'img/ball.png'
  }

  run = () => {
    this.runBase()
    this.wallCollision()
    this.move()
  }
}