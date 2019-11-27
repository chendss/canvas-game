const mapping = function () {
  const domList = qs('*')
  for (let dom of domList) {
    const data = dom.dataset
    if (data != null) {
      for (let key of Object.keys(data)) {
        const value = data[key]
        dom.setAttribute(value || key, config[key])
      }
    }
  }
}

const createBtn = function () {
  const games = config.games
  const btnBox = q('#id-btn-box')
  const htmlList = []
  for (let gameId of Object.keys(games)) {
    htmlList.push(`<button id="${gameId}-btn" class="btn-canvas">${gameId}</button> `)
  }
  btnBox.insertAdjacentHTML('beforeend', htmlList.join(''))
}

const createCanvas = function () {
  const games = config.games
  const canvasBox = q('#id-canvas-box')
  const htmlList = []
  for (let gameId of Object.keys(games)) {
    htmlList.push(`<canvas id="${gameId}" data-width data-height class="none"></canvas> `)
  }
  canvasBox.insertAdjacentHTML('beforeend', htmlList.join(''))
}

const gameInit = function (id, canvas) {
  if (config.games[id] == null) {
    if (id === 'block') {
      config.games[id] = BlockGame.new(canvas)
    } else if (id === 'air') {
      config.games[id] = AirGame.new(canvas)
    } else if (id === 'flappybird') {
      config.games[id] = BirdGame.new(canvas)
    }
  }
}

const registerGame = function () {
  const btns = qs('.btn-canvas')
  for (let btn of btns) {
    btn.addEventListener('click', () => {
      const id = btn.innerText
      const canvasList = qs('canvas')
      canvasList.forEach(c => c.classList.add('none'))
      const canvas = q(`#${id}`)
      canvas.classList.remove('none')
      gameInit(id, canvas)
    })
  }
}

const bindEvent = function () {
  q('#id-input-fps').addEventListener('input', (event) => {
    if (config.debug) {
      const val = event.target.value
      config.fps = Number(val)
    }
  })
}

const __main = function () {
  createCanvas()
  createBtn()
  mapping()
  registerGame()
  bindEvent()
}

__main()
