class BlockScene extends BaseScene {
  constructor(canvas, blocksOfNumber, life) {
    super(canvas)
    this.blocksOfNumber = blocksOfNumber
    this.blockLife = life
  }

  paddleInit = async () => {
    const x = config.width / 3
    const y = config.height - 50
    const paddle = await Paddle.new(x, y, config.blockGame.paddle)
    this.elementDict['paddle'] = paddle
  }

  blockInit = async () => {
    for (let i = 0; i < this.blocksOfNumber; i++) {
      const key = 'block' + i
      this.elementDict[key] = await Block.new(...randomCoordinate())
      this.elementDict[key].life = this.blockLife
    }
  }

  loadElement = async () => {
    await this.paddleInit()
    await this.blockInit()
    this.npcDict = {
      ball: await Ball.new(100, 100, config.blockGame.ball)
    }
    this.elementControl()
  }

  elementControl = () => {
    this.registerAction('a', () => {
      const paddle = this.elementDict['paddle']
      paddle.move('x', 'back')
    })
    this.registerAction('d', () => {
      const paddle = this.elementDict['paddle']
      paddle.move('x')
    })
  }

  setBallObstacles = () => {
    if (this.npcDict.ball) {
      this.npcDict.ball.obstacles = Object.values(this.elementDict)
    }
  }

  draw = () => {
    this.drawBase()
    this.setBallObstacles()
    if (this.npcDict.ball.status === 'die') {
      this.status = 'over'
    }
  }
}
