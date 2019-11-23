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

const randomCoordinate = function (w, h) {
  const maxX = w || config.width
  const maxY = h || config.height
  const result = [randomRange(0, maxX), randomRange(0, maxY)]
  return result
}
