class BaseScene {
	/**
	 * @param {*} resources 资源文件
	 * @param {Array<BaseElement>} elements 元素集合
	 * @memberof BaseScene
	 */
	constructor(resources = {}, elements = []) {
		this.resources = resources
		this.elements = elements
		this.imgDict = {}
		this.actions = {}
		this.gameContext = null
		this.status = null
	}

	/**
	 * 注册场景///执行函数
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
}
