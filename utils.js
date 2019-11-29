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
  return (
    (aInb(a.x, b.x, b.x + b.width) || aInb(b.x, a.x, a.x + a.width)) &&
    (aInb(a.y, b.y, b.y + b.height) || aInb(b.y, a.y, a.y + a.height))
  )
}

const randomRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomCoordinate = function (w, h) {
  const maxX = w || config.width - 20
  const maxY = h || config.height - 20
  const result = [randomRange(0, maxX), randomRange(0, maxY)]
  return result
}

const sum = function (arr) {
  let result = 0
  for (let item of arr) {
    if (typeof item === 'number') {
      result += item
    } else {
      result += Number(item)
    }
  }
  return result
}

const sumBy = function (arr, identity) {
  const list = arr.map(item => item[identity])
  return sum(list)
}

const loadImg = function (src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve(img)
  })
}

const toArray = function (source) {
  if (source instanceof Array) {
    return source
  }
  return [source]
}

const range = function (min, max, val) {
  if (val >= max) {
    return max
  } else if (val <= min) {
    return min
  }
  return val
}