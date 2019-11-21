class BlockGame extends BaseGame {
	constructor(...args) {
		super(...args)
		this.bindEvent()
	}

	bindEvent = () => {
		bindDown('k', () => {
			log('popop', this.status, this.sceneDict)
			if (this.status === 'wait') {
				this.changeScene('first')
				this.status = 'ing'
			}
		})
	}
}
