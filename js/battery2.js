import '../less/common.less'
import '../less/battery1.less'
import '../less/battery2.less'
import Animate from 'velocity-animate'

const random  = function (min, max, floor) {
	let num = min + Math.random() * (max - min)
	if (floor) {
		return Math.floor(num)
	} else {
		return num
	}
}

class Circle {
	constructor () {
		this.init()
	}
	create () {
		let c = document.createElement('div')
		c.style.width = this.radius + 'px'
		c.style.height = this.radius + 'px'
		c.style.borderRadius = this.radius + 'px'
		c.style.left = this.x - this.radius / 2 + 'px' // 中心点
		c.classList.add('circles')
		return c
	}
	init () {
		this.radius = random(15, 30)
		this.vy = random(1500, 3000, true) // 用时间衡量速度
		this.x = random(Circle.range, Circle.width - Circle.range) // x初始横坐标位置
		this.dom = this.create()
	}
}

class Run {
	constructor() {
		this.container = document.querySelector('.circle-container')
		// 设置静态量，描述小球画布范围
		Circle.width = this.container.offsetWidth // 画布宽度
		Circle.height = this.container.offsetHeight // 小球移动的最大高度
		Circle.range = Circle.width / 4 // 左右留下的间距

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
		return Animate(circle.dom, {
			bottom: Circle.height + 'px'
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
