class BirdGame extends BaseGame {
  constructor(...args) {
    super(...args)
    this.levelNumber = 0
    this.bindEvent()
    this.createScene()
    this.extraTitle.start = 'w跳，ad转向'
  }

  createScene () {
    this.sceneDict['bird'] = new BirdScene(this.canvas)
  }

  bindEvent = () => {
    bindDown('k', () => {
      if (this.status === 'wait') {
        this.changeScene('bird')
        q('#flappybird').classList.add('bg')
      }
    })
    bindDown('r', () => {
      if (this.status === 'over') {
        this.changeScene('start')
        this.levelNumber = 0
      }
    })
  }

  draw = () => {
    if (this.status === 'over') {
      q('#flappybird').classList.remove('bg')
    }
  }
}