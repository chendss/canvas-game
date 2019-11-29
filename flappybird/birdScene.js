class BirdScene extends BaseScene {
  constructor(canvas) {
    super(canvas)
    this.n = 0
  }

  reset () {
    // 重制场景
    super.reset()
    const npc = vagueObj(this.npcDict, 'pipe')
    for (let key of Object.keys(npc)) {
      delete this.npcDict[key]
    }
    this.pipeInit()
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
    // 鸟初始化
    const x = config.width / 4
    const y = config.height / 2
    const cfg = config.flappybird.bird
    const bird = await Bird.new(x, y, cfg)
    this.player = bird
    this.addElement('player', this.player)
  }

  birdObstacles = () => {
    this.addObstacles(this.npcDict, 'land', [this.player])
    this.addObstacles(this.npcDict, 'pipe', [this.player])
  }

  landInit = async () => {
    // 加载路
    const len = Math.ceil(config.width / 137)
    const h = config.height - 60
    for (let i = 0; i < len + 1; i++) {
      const land = await Land.new(i * 137, h, config.flappybird.land)
      this.addNpc('land' + i, land)
    }
  }

  lastPipeX = (pipeX) => {
    const pipeDict = vagueObj(this.npcDict, 'pipeTop')
    const pipes = Object.values(pipeDict)
    const len = pipes.length
    const result = pipes[len - 1]
    return pipeX || result.x
  }

  addPipe = async (pipeX) => {
    // 加载一组水管
    const cfg = config.flappybird.pipe
    const lastPipeX = this.lastPipeX(pipeX)
    const { intervalX, intervalY } = config.flappybird.pipe
    const intervalPipeX = randomRange(intervalX.min, intervalX.max)
    const intervaPipelY = randomRange(intervalY.min, intervalY.max)
    const pipX = lastPipeX + intervalPipeX + 50
    const topY = randomRange(-(320 * 2 - config.height + 100), 0)
    const bottomY = 320 + topY + intervaPipelY
    let pipeBottom = await Pipe.new(pipX, bottomY, cfg)
    let pipeTop = await Pipe.new(pipX, topY, cfg)
    this.addNpc(`pipeTop${this.n++}`, pipeTop)
    this.addNpc(`pipeBottom${this.n++}`, pipeBottom)
  }

  pipeInit = async () => {
    // 水管初始化
    const birdX = this.player.x
    const x = randomRange(birdX + 100, config.width)
    const intervalX = randomRange(100, 150)
    for (let i = 0; i < 10; i++) {
      if (i == 0) {
        const pipX = x + i * (intervalX + 50)
        await this.addPipe(pipX)
      } else {
        await this.addPipe()
      }
    }
  }

  loadElement = async () => {
    await this.birdInit()
    await this.landInit()
    this.elementControl()
  }

  runPipe = async () => {
    // 检测pipe的状况
    const birdX = this.player.x
    const pipeDict = vagueObj(this.npcDict, 'pipe')
    for (let key of Object.keys(pipeDict)) {
      const pipe = pipeDict[key]
      if (pipe.x >= birdX) {
        return
      } else if (pipe.x <= -pipe.width) {
        if (key.includes('pipeTop')) {
          await this.addPipe()
        }
        delete this.npcDict[key]
      }
    }
  }

  drawLife () { }

  draw = () => {
    this.drawBase()
    this.birdObstacles()
    this.runPipe()
  }
}