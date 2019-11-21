const mapping = function() {
	const domList = qs('*')
	for (let dom of domList) {
		const data = dom.dataset
		if (data != null) {
			for (let key of Object.keys(data)) {
				dom.setAttribute(key, config[key])
			}
		}
	}
}

const createScene = function() {
	const firstResources = {
		paddle: './img/paddle.png',
	}
	const result = {
		first: new FirstBlockScene(firstResources),
	}
	return result
}

const gameInit = function() {
	const canvas = document.querySelector('#id-canvas')
	const context = canvas.getContext('2d')
	const game = new BlockGame(canvas, context, createScene())
}

const __main = function() {
	mapping()
	gameInit()
}

__main()
