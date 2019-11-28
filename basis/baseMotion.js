class BaseMotion extends BaseElement {
  constructor(...args) {
    super(...args)
    this.index = 0
    this.imgs = []
    this.imgPaths = []
    this.coolTimeOfNumber = 0
    this.flipx = false
    this.rotation = 0
    this.rotationFlag = false
  }

  get cool () {
    const ele = this.eleConfig
    const vals = [this.coolTime, ele.coolTime, 0]
    return vals.find(v => v != null)
  }

  static async new (x, y, eleConfig) {
    const ele = await new this(x, y, eleConfig)
    for (let imgPath of ele.imgPaths) {
      const img = await loadImg(imgPath)
      ele.imgs.push(img)
    }
    log('会动的元素加载完成')
    return ele
  }

  drawElement (gameContext, img) {
    const { y } = this
    const w2 = this.width / 2
    const h2 = this.height / 2
    gameContext.save()
    gameContext.translate(this.x + w2, 0)
    gameContext.rotate(this.rotation * Math.PI / 180)
    gameContext.translate(-w2, -h2)
    if (this.flipx) {
      const x = this.x + this.width / 2
      gameContext.scale(-1, 1)
      gameContext.drawImage(img, x, y)
    } else {
      gameContext.drawImage(img, 0, 0)
    }
    gameContext.restore()
  }

  draw (gameContext) {
    this.drawBefore && this.drawBefore(gameContext)
    const img = this.imgs[this.index]
    this.drawElement(gameContext, img)
    if (this.coolTimeOfNumber < this.cool) {
      this.coolTimeOfNumber++
      return
    } else {
      this.coolTimeOfNumber = 0
      this.index = (this.index + 1) % this.imgs.length
    }
    this.drawAfter && this.drawAfter(gameContext)
  }
}