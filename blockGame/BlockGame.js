class BlockGame extends BaseGame {
  constructor(...args) {
    super(...args)
    this.bindEvent()
  }

  bindEvent = () => {
    bindDown('k', () => {
      if (this.status === 'wait') {
        this.changeScene('first')
        this.status = 'ing'
      }
    })
  }
}
