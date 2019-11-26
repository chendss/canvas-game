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
		this.fraction = 0
		this.player = null
	}

	get gameContext() {
		if (this.canvas == null) {
			return null
		}
		return this.canvas.getContext('2d')
	}

	keyDown = key => {
		this.keydowns[key] = true
	}

	keyUp = key => {
		this.keydowns[key] = false
	}

	elementBirth = async (item, cfg, Item, position = 'bottom') => {
		const { x, y, width, height } = item
		let dy = 20
		if (position === 'top') {
			dy = -20
		}
		const itemX = x + width / 2
		const itemY = y + height / 2 + dy
		const result = await Item.new(itemX, itemY, cfg)
		return result
	}

	reset = () => {
		this.status = null
		this.fraction = 0
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

	loadElement = function() {}

	loadResources = function() {}

	loadNpc = function() {}

	sceneOver = function() {
		if (this.player.status === 'die') {
			this.status = 'over'
		}
	}

	addObstacles = (source, targetKey, obstacles) => {
		const target = vagueObj(source, targetKey)
		for (let key of Object.keys(target)) {
			const item = target[key]
			item.obstacles = obstacles
		}
	}

	addElement = (key, item) => {
		this.elementDict[key] = item
	}

	addNpc = (key, item) => {
		this.npcDict[key] = item
	}

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
			const { run, status } = sprite
			if (status !== 'die') {
				run && run()
				sprite.draw && sprite.draw(this.gameContext)
			}
		}
	}

	drawFraction = () => {
		if (this.fraction === 0) return
		const msg = `游戏分数为${this.fraction}`
		this.gameContext.fillText(msg, 100, 20)
	}

	drawLife() {
		if (this.player == null) return
		const life = this.player.life
		const meetOfNumber = this.player.meetOfNumber
		const msg = `生命值${life - meetOfNumber}`
		this.gameContext.fillText(msg, config.width - 40, config.height - 20)
	}

	drawBase = () => {
		this.actionRun()
		this.drawElement()
		this.drawFraction()
		this.sceneOver()
		this.drawLife()
	}
}
