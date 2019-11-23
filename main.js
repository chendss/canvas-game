const mapping = function () {
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

const createScene = function (canvas) {
  const firstResources = {}
  const result = {
    first: new FirstBlockScene(canvas, firstResources),
  }
  return result
}

const gameInit = function () {
  const canvas = document.querySelector('#id-canvas')
  const game = BlockGame.new(canvas)
}

const __main = function () {
  mapping()
  gameInit()
}

__main()
