const config = {
	fps: 60,
	width: 500,
	height: 800,
	debug: true,
	blockGame: {
		paddle: {
			speedX: 8,
		},
		ball: {
			speedX: 8,
			speedY: 6,
		},
	},
	airGame: {
		aircraft: {
			speedX: 5,
			speedY: 5,
			life: 15,
			kill: 100, // 碰撞时给予对方的伤害
			coolTime: 100,
		},
		enemy: {
			speedX: 0,
			speedY: 3,
			life: 2,
			number: 5,
		},
		enemyBullet: {
			speedX: 0,
			speedY: 5,
			life: 1,
			coolTime: 1500,
		},
		bullet: {
			speedY: -3,
			speedX: 0,
		},
		cloud: {
			speedX: 0,
			speedY: 2,
		},
	},
	games: {
		block: null,
		air: null,
		flappybird: null,
	},
}
