class BlockGame extends BaseGame {
  constructor(...args) {
    super(...args)
    this.levelNumber = 0
    this.bindEvent()
  }

  createScene () {
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i]
      const number = level[0]
      const life = level[1]
      this.sceneDict[`scene${i}`] = new BlockScene(this.canvas, number, life)
    }
  }

  nextScene = () => {
    const levelNumber = this.levelNumber + 1
    if (levelNumber > levels.length - 1) {
      this.changeScene('end')
      this.levelNumber = 0
    } else {
      this.levelNumber = levelNumber
      this.changeScene(`scene${this.levelNumber}`)
    }
  }

  bindEvent = () => {
    bindDown('k', () => {
      if (this.status === 'wait') {
        log('开始游戏了，打砖块', this.sceneDict)
        this.changeScene('scene0')
      }
    })
    bindDown('r', () => {
      if (this.status === 'over') {
        this.changeScene('start')
        this.levelNumber = 0
      }
    })
    bindDown('n', () => {
      if (this.status === 'ing') {
        this.nextScene()
      }
    })
  }

  draw = () => {
    if (['start', 'end'].includes(this.sceneKey)) return
    const gameContext = this.canvas.getContext('2d')
    gameContext.font = '24px serif'
    const msg = `当前第${this.levelNumber + 1}关 按n进入下一关`
    gameContext.fillText(msg, 150, config.height - 10)
  }
}
