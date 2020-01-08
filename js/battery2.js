const scale = 150
class Circle {
	constructor() {
		this.width = scale //画布宽度
		this.height = scale * 4/3 // 小球移动的最大高度
		this.range = scale / 4 // 左右留下的间距
		
		this.update()
		this.createCircle()
	}
	update () {
		// x初始横坐标位置
		this.x = this.random(this.range, this.width - this.range)
		this.vy = this.random(1500, 3000, true) // 用时间衡量速度
		this.radius = this.random(15, 30)
		
		this.createCircle()
	}
	random (min, max, floor) {
		let num = min + Math.random() * (max - min)
		if (floor) {
			return Math.floor(num)
		} else {
			return num
		}
	}
	createCircle () {
		let c = document.createElement('div')
		c.style.width = this.radius + 'px'
		c.style.height = this.radius + 'px'
		c.style.borderRadius = this.radius + 'px'
		c.style.left = this.x - this.radius / 2 + 'px' // 中心点
		c.classList.add('circles')
		this.dom = c
	}
}
class Run {
	constructor() {
		this.container = document.querySelector('.circle-container')
		this.circles = new Set()
		this.num = 10 // 小球个数
		
		this.createCircle()
		this.run()
	}
	createCircle () {
		for (let i=0; i<this.num; i++) {
			this.circles.add(new Circle())
		}
	}
	animation (circle) {
		this.container.appendChild(circle.dom)
		return circle.dom.velocity({
			bottom: circle.height + 'px'
		}, {
			duration: circle.vy,
			complete: () => {
				circle.dom.remove()
				circle.update()
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