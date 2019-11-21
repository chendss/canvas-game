class BaseGame {
	/**
	 *
	 * @param {object} sceneDict 场景实例集合
	 * @param {object} canvas 实例
	 * @param {object} context context 画布
	 * @memberof BaseGame
	 */
	constructor(canvas, context, sceneDict = {}) {
		this.sceneDict = { ...sceneDict }
		this.sceneDict.start = new GameStartScene()
		this.canvas = canvas
		this.context = context
		this.runPointer = null
		this.sceneKey = 'start'
		this.actions = {}
		this.status = 'wait' // wait-等待开始,ing-进行中 游戏状态
		this.init()
	}

	get scene() {
		return this.sceneDict[this.sceneKey]
	}

	get gameSpeed() {
		return 1000 / config.fps
	}

	changeScene = sceneKey => {
		this.sceneKey = sceneKey
	}

	/**
	 * 注册游戏控制场景的逻辑
	 *
	 * @memberof BaseScene
	 */
	registerAction = (key, callback) => {
		this.actions[key] = callback
	}

	clearReact = () => {
		const context = this.context
		const canvas = this.canvas
		context.clearRect(0, 0, canvas.width, canvas.height)
	}

	draw = () => {
		if (this.scene == null) return
		this.scene.draw()
	}

	run = () => {
		this.clearReact()
		this.draw()
	}

	__start = () => {
		this.runPointer = setInterval(this.run, this.gameSpeed)
	}

	loadScene = async () => {
		for (let scene of Object.values(this.sceneDict)) {
			await scene.init(this.context)
		}
	}

	init = async () => {
		await this.loadScene()
		this.__start()
	}
}
