class BaseScene {
	/**
	 * @param {*} resources 资源文件
	 * @memberof BaseScene
	 */
	constructor(resources = {}) {
		this.resources = resources
		this.elementDict = {}
		this.imgDict = {}
		this.actions = {}
		this.gameContext = null
		this.status = null
		this.keydowns = {}
	}

	/**
	 * 注册场景 控制元素的执行函数
	 *
	 * @memberof BaseScene
	 */
	registerAction = (key, callback) => {
		this.actions[key] = callback
	}

	gameImg = path => {
		const img = new Image()
		img.src = path
		return new Promise(resolve => {
			img.onload = () => resolve(img)
		})
	}

	loadFileResources = async () => {
		for (let key of Object.keys(this.resources)) {
			const path = this.resources[key]
			this.imgDict[key] = await this.gameImg(path)
		}
	}

	init = async gameContext => {
		await this.loadFileResources()
		this.gameContext = gameContext
		log('场景加载', this.imgDict)
	}

	drawBase = callback => {
		const elementDict = this.elementDict
		for (let ele of Object.values(elementDict)) {
			const { x, y, path } = ele
			const img = this.imgDict[path]
			callback && callback(ele)
			this.gameContext.drawImage(img, x, y)
		}
	}
}
