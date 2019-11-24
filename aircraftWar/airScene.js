class AirScene extends BaseScene {
  constructor(canvas) {
    super(canvas)
    this.bulletOfNumber = 0
    this.enemyOfNumber = 10
  }

  airCraftInit = async () => {
    const x = config.width / 3
    const y = config.height - 50
    const airCraft = await Aircraft.new(x, y, config.airGame.airCraft)
    this.elementDict['airCraft'] = airCraft
  }

  enemyInit = async () => {
    for (let i = 0; i < this.enemyOfNumber; i++) {
      const key = 'enemy' + i
      const [x, y] = randomCoordinate(null, 200)
      this.npcDict[key] = await Enemy.new(x, y, config.airGame.enemy)
    }
  }

  loadElement = async () => {
    await this.airCraftInit()
    await this.enemyInit()
    this.elementControl()
  }

  createBullet = async () => {
    const airCraft = this.elementDict['airCraft']
    const { x, y, width, height } = airCraft
    const bulletX = x + width / 2
    const bulletY = y + height / 2 - 20
    const bullet = await Bullet.new(bulletX, bulletY, config.airGame.bullet)
    this.npcDict[`bullet${this.bulletOfNumber++}`] = bullet
  }

  setBulletObstacles = () => {
    const bulletDict = vagueObj(this.npcDict, 'bullet')
    const enemyDict = vagueObj(this.npcDict, 'enemy')
    for (let key of Object.keys(bulletDict)) {
      const bullet = bulletDict[key]
      bullet.obstacles = Object.values(enemyDict)
    }
  }

  elementControl = () => {
    this.registerAction('a', () => {
      const airCraft = this.elementDict['airCraft']
      airCraft.move('x', 'back')
    })
    this.registerAction('d', () => {
      const airCraft = this.elementDict['airCraft']
      airCraft.move('x')
    })
    this.registerAction('w', () => {
      const airCraft = this.elementDict['airCraft']
      airCraft.move('y', 'back')
    })
    this.registerAction('s', () => {
      const airCraft = this.elementDict['airCraft']
      airCraft.move('y')
    })
    this.registerAction('c', () => {
      this.createBullet()
    })
  }


  draw = () => {
    this.drawBase()
    this.setBulletObstacles()
  }
}