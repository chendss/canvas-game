class AirScene extends BaseScene {
  constructor(canvas) {
    super(canvas)
    this.bulletOfNumber = 0
    this.enemyOfNumber = config.airGame.enemy.number
    const coolTime = config.airGame.enemyBullet.coolTime
    this.enemyBulletThrottle = throttle(this.enemyBullet, coolTime)
  }

  aircraftInit = async () => {
    const x = config.width / 3
    const y = config.height - 50
    const aircraft = await Aircraft.new(x, y, config.airGame.aircraft)
    this.elementDict['aircraft'] = aircraft
  }

  enemyInit = async () => {
    for (let i = 0; i < this.enemyOfNumber; i++) {
      const key = 'enemy' + i
      const [x, y] = randomCoordinate(null, 50)
      const item = await Enemy.new(x, y, config.airGame.enemy)
      item.obstacles.push(this.elementDict['aircraft'])
      this.addNpc(key, item)
    }
  }

  backgroudInit = async () => {
    const cloudConfig = config.airGame.cloud
    this.addNpc('cloud', await Cloud.new(300, 100, cloudConfig))
    this.addNpc('cloud2', await Cloud.new(100, 150, cloudConfig))
  }

  loadNpc = async () => {
    await this.backgroudInit()
    await this.enemyInit()
  }

  loadElement = async () => {
    await this.aircraftInit()
    this.elementControl()
  }

  createBullet = async () => {
    const aircraft = this.elementDict['aircraft']
    const c = config.airGame.bullet
    const number = this.bulletOfNumber++
    const bullet = await this.elementBirth(aircraft, c, Bullet, 'top')
    this.addNpc(`bulletAir${number}`, bullet)
  }

  airBulletObstacles = () => {
    // 飞机子弹的障碍物
    const enemyDict = vagueObj(this.npcDict, 'enemy')
    const enemyObstacles = Object.values(enemyDict)
    const enemyBulletDict = vagueObj(this.npcDict, 'bulletEnemy')
    const obstacles = enemyObstacles.concat(Object.values(enemyBulletDict))
    this.addObstacles(this.npcDict, 'bulletAir', obstacles)
  }

  enemyBulletObstacles = () => {
    // 敌机子弹的障碍物
    const enemyDict = vagueObj(this.npcDict, 'Air')
    const aircraft = this.elementDict['aircraft']
    const obstacles = Object.values(enemyDict).concat(aircraft)
    this.addObstacles(this.npcDict, 'bulletEnemy', obstacles)
  }

  elementControl = () => {
    const dict = {
      a: ['x', 'back'],
      d: ['x'],
      w: ['y', 'back'],
      s: ['y']
    }
    for (let key of Object.keys(dict)) {
      const param = dict[key]
      this.registerAction(key, () => {
        const aircraft = this.elementDict['aircraft']
        aircraft.move(...param)
      })
    }
    const coolTime = config.airGame.aircraft.coolTime
    this.registerAction('c', throttle(this.createBullet, coolTime))
  }

  clearBullet = () => {
    const bullet = vagueObj(this.npcDict, 'bullet')
    for (let key of Object.keys(bullet)) {
      const value = this.npcDict[key]
      if (value.status === 'die') {
        delete this.npcDict[key]
      }
    }
  }

  enemyBullet = async () => {
    const enemy = vagueObj(this.npcDict, 'enemy')
    const c = config.airGame.enemyBullet
    for (let key of Object.keys(enemy)) {
      const item = this.npcDict[key]
      const number = this.bulletOfNumber++
      const bullet = await this.elementBirth(item, c, Bullet)
      this.addNpc(`bulletEnemy${number}`, bullet)
    }
  }

  sceneOver = () => {
    const aircraft = this.elementDict['aircraft']
    if (aircraft.status === 'die') {
      this.status = 'over'
    }
  }

  draw = () => {
    this.drawBase()
    this.airBulletObstacles()
    this.enemyBulletObstacles()
    this.enemyBulletThrottle()
    this.clearBullet()
  }
}