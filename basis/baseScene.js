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
    this.status = null // over 会导致游戏结束的场景结束 next-下一个场景
    this.keydowns = {}
    this.npcDict = {}
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

  reset = () => {
    this.status = null
    const elementList = Object.values(this.elementDict)
    const npcList = Object.values(this.npcDict)
    for (let item of [...npcList, ...elementList]) {
      item.reset()
    }
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

  loadResources = function () { }

  loadNpc = function () { }

  init = async () => {
    await this.loadElement()
    await this.loadNpc()
    await this.loadResources()
    log('场景加载完成', this, this.elementDict)
  }

  actionRun = () => {
    const actions = this.actions
    for (let entries of Object.entries(actions)) {
      const [key, handle] = entries
      if (this.keydowns[key] === true && handle instanceof Function) {
        handle()
      }
    }
  }

  drawElement = () => {
    const elementList = Object.values(this.elementDict)
    const npcList = Object.values(this.npcDict)
    const sprites = [...elementList, ...npcList]
    for (let sprite of sprites) {
      const { x, y, img, run, status } = sprite
      if (status !== 'die') {
        run && run()
        this.gameContext.drawImage(img, x, y)
      }
    }
  }

  drawBase = () => {
    this.actionRun()
    this.drawElement()
  }
}
