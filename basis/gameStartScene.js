class GameStartScene extends BaseScene {
	constructor(...args) {
		super(...args)
  }
  
  startGame=()=>{
    this.registerAction('k',()=>{
      
    })
  }

	draw = () => {
		const x = config.width / 2
		const y = config.height / 2
		this.gameContext.font = '36px serif'
		this.gameContext.textAlign = 'center'
		this.gameContext.fillText('按 k 开始游戏', x, y)
	}
}
