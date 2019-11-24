const log = function () {
  console.log(...arguments)
}

const q = s => document.querySelector(s)
const qs = s => [...document.querySelectorAll(s)]

const bindDown = function (key, callback) {
  window.addEventListener('keydown', event => {
    if (key === event.key) {
      callback && callback(key)
    }
  })
}

const bindUp = function (key, callback) {
  window.addEventListener('keyup', event => {
    if (key === event.key) {
      callback && callback(key)
    }
  })
}

const vagueObj = function (source, vague) {
  const result = {}
  for (let key of Object.keys(source)) {
    const value = source[key]
    if (key.includes(vague)) {
      result[key] = value
    }
  }
  return result
}

const aInb = (x, x1, x2) => {
  return x >= x1 && x <= x2
}

const collide = function (a, b) {
  return (aInb(a.x, b.x, b.x + b.width) || aInb(b.x, a.x, a.x + a.width))
    && (aInb(a.y, b.y, b.y + b.height) || aInb(b.y, a.y, a.y + a.height))
}

const randomRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function throttle (fn, gapTime) {
  let _lastTime = null
  return async function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      await fn()
      _lastTime = _nowTime
    }
  }
}

const randomCoordinate = function (w, h) {
  const maxX = w || (config.width - 20)
  const maxY = h || (config.height - 20)
  const result = [randomRange(0, maxX), randomRange(0, maxY)]
  return result
}

const sum = (...arr) => [].concat(...arr).reduce((acc, val) => acc + val, 0)