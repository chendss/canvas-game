class BaseElement {
	constructor(x, y, path) {
		this.x = x
		this.y = y
		this.speed = 0
		this.path = path
	}

	setSpeed = speed => {
		this.speed = speed
	}
}
