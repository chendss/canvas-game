const log = function() {
	console.log(...arguments)
}

const q = s => document.querySelector(s)
const qs = s => [...document.querySelectorAll(s)]

const bindDown = function(key, callback) {
	window.addEventListener('keydown', event => {
		if (key === event.key) {
			callback && callback(key)
		}
	})
}

const bindUp = function(key, callback) {
	window.addEventListener('keyup', event => {
		if (key === event.key) {
			callback && callback(key)
		}
	})
}
