class BlockScene extends BaseScene {
  constructor(canvas, blocksOfNumber, life) {
    super(canvas)
    this.blocksOfNumber = blocksOfNumber
    this.blockLife = life
    this.bindEvent()
  }

  addBlock = async (id, point) => {
    const block = await Block.new(...point)
    block.life = this.blockLife
    this.addElement(`block${id}`, block)
  }

  bindEvent = () => {
    this.canvas.addEventListener('click', async event => {
      if (this.status === 'ing') {
        const { offsetX, offsetY } = event
        const index = randomRange(1, 10 * 10000)
        await this.addBlock(index, [offsetX, offsetY])
      }
    })
  }

  paddleInit = async () => {
    const x = config.width / 3
    const y = config.height - 50
    const paddle = await Paddle.new(x, y, config.blockGame.paddle)
    this.addElement('paddle', paddle)
  }

  blockInit = async () => {
    for (let i = 0; i < this.blocksOfNumber; i++) {
      const key = 'block' + i
      const paddle = this.elementDict['paddle']
      const h = paddle.y - 40
      await this.addBlock(key, randomCoordinate(null, h))
    }
  }

  loadElement = async () => {
    await this.paddleInit()
    await this.blockInit()
    this.npcDict = {
      ball: await Ball.new(100, 100, config.blockGame.ball),
    }
    this.player = this.npcDict.ball
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
    // 设置球的障碍物
    if (this.npcDict.ball) {
      const obstacles = Object.values(this.elementDict)
      this.addObstacles(this.npcDict, 'ball', obstacles)
    }
  }

  drawLife () { }

  draw = () => {
    this.drawBase()
    this.setBallObstacles()
    if (this.npcDict.ball.status === 'die') {
      this.status = 'over'
    }
    const elements = Object.values(this.elementDict)
    this.fraction = elements.filter(e => e.status === 'die').length // 计算分数
  }
}
