class Land extends Npc {
  constructor(...args) {
    super(...args)
    this.imgPath = './img/land.png'
  }

  scope (value) { return value }

  wallCollision () { }

  runExtra = () => {
    const w = 137
    const len = Math.ceil(config.width / w)
    if (this.x <= -this.width) {
      // 当路移动到外部时，塞到队伍末尾
      this.x = (len + 1) * w + this.x
    }
  }
}