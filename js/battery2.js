const random  = function (min, max, floor) {
	let num = min + Math.random() * (max - min)
	if (floor) {
		return Math.floor(num)
	} else {
		return num
	}
}

const scale = 150
class Circle {
	constructor () {
		this.width = scale // 画布宽度
		this.height = scale * 4/3 // 小球移动的最大高度
		this.range = scale / 4 // 左右留下的间距
		
		this.init()
	}
	create (x, radius) {
		let c = document.createElement('div')
		c.style.width = radius + 'px'
		c.style.height = radius + 'px'
		c.style.borderRadius = radius + 'px'
		c.style.left = x - radius / 2 + 'px' // 中心点
		c.classList.add('circles')
		return c
	}
	init () {
		this.radius = random(15, 30)
		this.vy = random(1500, 3000, true) // 用时间衡量速度
		this.x = random(this.range, this.width - this.range) // x初始横坐标位置
		this.dom = this.create(this.x, this.radius)
	}
}
class Run {
	constructor() {
		this.container = document.querySelector('.circle-container')
		
		this.circles = this.createCircle(10)
		this.run()
	}
	createCircle (num) {
		let circles = new Set()
		for (let i=0; i<num; i++) {
			circles.add(new Circle())
		}
		return circles
	}
	animation (circle) {
		this.container.appendChild(circle.dom)
		return circle.dom.velocity({
			bottom: circle.height + 'px'
		}, {
			duration: circle.vy,
			complete: () => {
				circle.init()
				this.animation(circle)
			}
		})
	}
	run () {
		this.circles.forEach(item => {
			this.animation(item)
		})
	}
}
window.onload = function () {
	new Run()
}
