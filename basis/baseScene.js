class BaseScene {
	/**
	 * @param {*} resources 资源文件
	 * @param {*} canvas canvas实例
	 * @memberof BaseScene
	 */
  constructor(canvas, resources = {}) {
    this.resources = resources
    this.canvas = canvas
    this.elementDict = {}
    this.imgDict = {}
    this.actions = {}
    this.status = null
    this.keydowns = {}
  }

  get gameContext () {
    if (this.canvas == null) {
      return null
    }
    return this.canvas.getContext('2d')
  }

  keyDown = (key) => {
    this.keydowns[key] = true
  }

  keyUp = (key) => {
    this.keydowns[key] = false
  }

	/**
	 * 注册场景 控制元素的执行函数
	 *
	 * @memberof BaseScene
	 */
  registerAction = (key, callback) => {
    this.actions[key] = callback
    bindDown(key, this.keyDown)
    bindUp(key, this.keyUp)
  }

  loadElement = function () { }

  init = async () => {
    await this.loadElement()
    log('场景加载完成', this.elementDict)
  }

  drawBase = () => {
    const elementDict = this.elementDict
    for (let ele of Object.values(elementDict)) {
      const { x, y, img } = ele
      const actions = this.actions
      for (let entries of Object.entries(actions)) {
        const [key, handle] = entries
        if (this.keydowns[key] === true && handle instanceof Function) {
          handle()
        }
      }
      this.gameContext.drawImage(img, x, y)
    }
  }
}
