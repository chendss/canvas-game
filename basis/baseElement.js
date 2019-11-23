class BaseElement {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.speed = 0
    this.imgPath = ''
    this.img = new Image()
  }

  static async new (x, y) {
    return new Promise((resolve => {
      const ele = new this(x, y)
      ele.img.src = ele.imgPath
      ele.img.onload = () => resolve(ele)
    }))
  }

  setSpeed = speed => {
    this.speed = speed
  }
}
