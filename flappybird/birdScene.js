class BirdScene extends BaseScene {
  constructor(canvas) {
    super(canvas)
    this.n = 0
  }

  elementControl () {
    this.registerAction('w', () => {
      this.player.jump()
    })
    this.registerAction('a', () => {
      this.player.direction('left')
    })
    this.registerAction('d', () => {
      this.player.direction('right')
    })
  }

  birdInit = async () => {
    const x = config.width / 4
    const y = config.height / 2
    const cfg = config.flappybird.bird
    const bird = await Bird.new(x, y, cfg)
    this.player = bird
    this.addElement('player', this.player)
  }

  birdObstacles = () => {
    // this.addObstacles(this.npcDict, 'land', [this.player])
  }

  landInit = async () => {
    const len = Math.ceil(config.width / 137)
    const h = config.height - 60
    for (let i = 0; i < len + 1; i++) {
      const land = await Land.new(i * 137, h, config.flappybird.land)
      this.addNpc('land' + i, land)
    }
  }

  pipeInit = async () => {
    const birdX = this.player.x
    const x = randomRange(birdX + 100, config.width)
    const cfg = config.flappybird.pipe
    const intervalX = randomRange(100, 150)
    for (let i = 0; i < 10; i++) {
      const intervalY = randomRange(100, 200)
      const pipX = x + i * (intervalX + 50)
      const topY = randomRange(-(320 * 2 - config.height + 100), 0)
      const bottomY = 320 + topY + intervalY
      let pipeBottom = await Pipe.new(pipX, bottomY, cfg)
      let pipeTop = await Pipe.new(pipX, topY, cfg)
      this.addNpc(`pipeTop${i}`, pipeTop)
      this.addNpc(`pipeBottom${i}`, pipeBottom)
    }
  }

  loadElement = async () => {
    await this.birdInit()
    // await this.landInit()
    // await this.pipeInit()
    this.elementControl()
  }

  drawPipe = async () => {
    const birdX = this.player.x
    const pipeDict = vagueObj(this.npcDict, 'pipeTop')
    for (let key of Object.keys(pipeDict)) {
      const pipe = pipeDict[key]
      if (pipe.x >= birdX) {
        return
      } else if (pipe.x <= -pipe.width) {
        delete this.npcDict[key]
      }
    }
    await this.pipeInit()
  }

  drawLife () { }

  draw = () => {
    this.drawBase()
    this.birdObstacles()
    // this.drawPipe()
  }
}