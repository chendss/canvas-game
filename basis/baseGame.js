class BaseGame {
	/**
	 *
	 * @param {Array<BaseScene>} sceneList 场景实例集合
	 * @memberof BaseGame
	 */
	constructor(sceneList = []) {
		this.sceneList = sceneList.concat([new GameStartScene()])
		this.scene = this.sceneList[0]
		this.canvas = document.querySelector('#id-canvas')
		this.context = this.canvas.getContext('2d')
    this.runPointer = null
    this.sceneIndex = 0
	}

	get gameSpeed() {
		return 1000 / config.fps
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
		for (let scene of this.sceneList) {
			await scene.init(this.context)
		}
	}

	init = async () => {
		await this.loadScene()
		this.__start()
	}
}
