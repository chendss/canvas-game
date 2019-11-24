class AirScene extends BaseScene {
  constructor(canvas) {
    super(canvas)
    this.bulletOfNumber = 0
    this.enemyOfNumber = config.airGame.enemy.number
    this.bulletCoolTime = config.airGame.bullet.coolTime
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
      const [x, y] = randomCoordinate(null, 50)
      this.npcDict[key] = await Enemy.new(x, y, config.airGame.enemy)
    }
  }

  backgroudInit = async () => {
    this.npcDict['cloud'] = await Cloud.new(100, 100, config.airGame.cloud)
  }

  loadElement = async () => {
    await this.airCraftInit()
    await this.enemyInit()
    await this.backgroudInit()
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