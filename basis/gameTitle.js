class GameTitle extends BaseScene {
  constructor(...args) {
    super(...args)
    this.title = '按 k 开始游戏'
  }

  draw = () => {
    const x = config.width / 2
    const y = config.height / 2
    this.gameContext.font = '36px serif'
    this.gameContext.textAlign = 'center'
    this.gameContext.fillText(this.title, x, y)
  }
}
