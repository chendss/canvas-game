class Npc extends BaseElement {
  // 系统自动控制到元素-会运动
  constructor(...args) {
    super(...args)
    this.obstacles = [] // 障碍物 - 撞到会反弹
  }

  /**
   * 撞到墙上
   *
   * @memberof BaseElement
   */
  wallCollision = () => {
    const boundary = this.boundary
    if (this.y >= this.boundary.y.max) {
      this.lifeControl(this.life - 1)
    }
    if (this.x <= 0 || this.x >= boundary.x.max) {
      this.gain.x *= -1
    }
    if (this.y <= 0 || this.y >= boundary.y.max) {
      this.gain.y *= -1
    }
  }

  /**
   * 判断碰撞
   *
   * @memberof Npc
   */
  meetObstacles = (callback) => {
    for (let obstacle of this.obstacles) {
      if (collide(this, obstacle) && obstacle.status !== 'die') {
        obstacle.meetOfNumber += 1
        if (callback) {
          callback()
        } else {
          this.gain.y *= -1
        }
      }
    }
  }

  run = () => {
    this.meetObstacles()
    this.wallCollision()
    this.move()
    this.runExtra && this.runExtra()
  }
}