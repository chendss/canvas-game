class AirGame extends BaseGame {
  constructor(...args) {
    super(...args)
    this.bindEvent()
    this.createScene()
  }

  createScene = () => {
    this.sceneDict['air'] = new AirScene(this.canvas)
  }

  bindEvent = () => {
    bindDown('k', () => {
      if (this.status === 'wait') {
        this.changeScene('air')
      }
    })
    bindDown('r', () => {
      if (this.status === 'over') {
        this.changeScene('start')
        this.levelNumber = 0
      }
    })
  }
}