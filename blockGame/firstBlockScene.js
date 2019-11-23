class FirstBlockScene extends BaseScene {
  constructor(...args) {
    super(...args)
    this.bindEvent()
  }

  bindEvent = () => {
    this.registerAction('a', () => {
      const paddle = this.elementDict['paddle']
      paddle.x -= paddle.speed
    })
    this.registerAction('d', () => {
      const paddle = this.elementDict['paddle']
      paddle.x += paddle.speed
    })
  }

  paddleInit = async () => {
    const x = config.width / 3
    const y = config.height - 50
    const paddle = await Paddle.new(x, y)
    paddle.setSpeed(config.blockGame.paddle.speed)
    return paddle
  }

  loadElement = async () => {
    this.elementDict = {
      paddle: await this.paddleInit(),
    }
  }

  draw = () => {
    this.drawBase()
  }
}
