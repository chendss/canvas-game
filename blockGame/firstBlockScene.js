class FirstBlockScene extends BaseScene {
	constructor(...args) {
		super(...args)
		this.elementInit()
		this.bindEvent()
	}

	bindEvent = () => {
		this.registerAction('a', () => {
			const paddle = this.elementDict['paddle']
			paddle.x += paddle.speed
		})
		this.registerAction('d', () => {
			const paddle = this.elementDict['paddle']
			paddle.x -= paddle.speed
		})
		bindDown('a', () => {
			this.keydowns['a'] = true
		})
		bindUp('a', () => {
			this.keydowns['a'] = false
		})
		bindDown('d', () => {
			this.keydowns['d'] = true
		})
		bindUp('d', () => {
			this.keydowns['d'] = false
		})
	}

	paddleInit = () => {
		const x = config.width / 3
		const y = config.height - 50
		const paddle = new Paddle(x, y, 'paddle')
		paddle.setSpeed(config.blockScene.paddle.speed)
		return paddle
	}

	elementInit = () => {
		this.elementDict = {
			paddle: this.paddleInit(),
		}
	}

	draw = () => {
		this.drawBase()
		const actions = this.actions
		for (let entries of Object.entries(actions)) {
			const [key, handle] = entries
			if (this.keydowns[key] === true && handle instanceof Function) {
				handle()
			}
		}
	}
}
