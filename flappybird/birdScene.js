class BirdScene extends BaseScene {
  constructor(canvas) {
    super(canvas)
  }

  elementControl() {
    this.registerAction('w', () => {
      this.player.move('y', 'back')
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

  landInit = async () => {
    const len = Math.ceil(config.width / 137)
    const h = config.height - 80
    for (let i = 0; i < len + 1; i++) {
      const land = await Land.new(i * 137, h, config.flappybird.land)
      this.addNpc('land' + i, land)
    }
  }

  loadElement = async () => {
    await this.birdInit()
    await this.landInit()
    this.elementControl()
  }

  drawLife() { }

  draw = () => {
    this.drawBase()
  }
}