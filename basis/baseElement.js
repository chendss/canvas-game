class BaseElement {
  constructor(x, y, eleConfig) {
    this.initX = x
    this.initY = y
    this.x = x
    this.y = y
    this.gain = {
      x: 1,
      y: 1,
    }
    this.speedX = null
    this.speedY = null
    this.imgPath = ''
    this.img = new Image()
    this.width = 0
    this.height = 0
    this.life = 1
    this.eleConfig = eleConfig
    this.status = 'ing'
    this.meetOfNumber = 0
  }

  static async new (x, y, eleConfig) {
    return new Promise(resolve => {
      const ele = new this(x, y, eleConfig)
      ele.img.src = ele.imgPath
      ele.img.onload = () => ele.over(resolve)
    })
  }

  get boundary () {
    return {
      x: {
        min: 0,
        max: config.width - this.width,
      },
      y: {
        min: 0,
        max: config.height - this.height,
      },
    }
  }

  get kill () {
    const eleConfig = this.eleConfig
    if (eleConfig && eleConfig.kill) {
      return eleConfig.kill
    }
    return 1
  }

  reset = () => {
    this.x = this.initX
    this.y = this.initY
    this.status = 'ing'
    this.meetOfNumber = 0
  }

  over = resolve => {
    this.width = this.img.width
    this.height = this.img.height
    resolve(this)
  }

  lifeControl = value => {
    this.life = value
    if (this.life <= 0) {
      this.status = 'die'
    }
  }

  scope (value, { min, max }) {
    let result = value
    if (value >= max) {
      result = max
    } else if (value <= min) {
      result = min
    }
    return result
  }

  get speed () {
    let speedX = this.speedX
    let speedY = this.speedY
    if (this.eleConfig) {
      speedX = speedX || this.eleConfig.speedX || 0
      speedY = speedY || this.eleConfig.speedY || 0
    }
    return {
      speedX,
      speedY,
    }
  }

  setCoordinate = (x, y) => {
    if (x != null) {
      this.x = this.scope(x, this.boundary.x)
    }
    if (y != null) {
      this.y = this.scope(y, this.boundary.y)
    }
  }

  draw (gameContext) {
    // 只传入画板
    const { x, y, img } = this
    gameContext.drawImage(img, x, y)
  }

  move (axis, direction = 'forward') {
    // 往右与往上代表前进,对于混乱元素不起效
    const directionDict = {
      forward: 1,
      back: -1,
    }
    const directionValue = directionDict[direction]
    if (axis === 'x' || axis == null) {
      const gainX = this.gain.x
      const speedX = this.speed.speedX * directionValue * gainX
      this.setCoordinate(this.x + speedX)
    }
    if (axis === 'y' || axis == null) {
      const gainY = this.gain.y
      const speedY = this.speed.speedY * directionValue * gainY
      this.setCoordinate(null, this.y + speedY)
    }
  }
}
