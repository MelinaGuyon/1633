import PixiComponent from 'abstractions/PixiComponent'
import { Sprite, Container } from 'pixi.js'
import anime from 'animejs'

import store from 'state/store'

const names = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
const positionsBuilded = [
  [-68, -121],
  [26, -194],
  [94, -149],
  [-14, -57],
  [94, 6],
  [-10, 100],
  [13, 134]
]
const positionsUnbuilded = [
  [-220, -100],
  [110, 180],
  [40, -124],
  [90, -40],
  [279, 10],
  [-180, 138],
  [230, 100]
]
const rotation = [
  0.3,
  0.7,
  0.2,
  -0.2,
  0,
  0.6,
  0
]

const bigGlassPosition = [11, -40]

class BigGlass extends PixiComponent {
  setup (props) {
    this.type = props.type || 'b'

    this.base = new Sprite(store.animations.get()['glass-z.png'][0])
    this.base.isHidden = true
    this.base.x = bigGlassPosition[0]
    this.base.y = bigGlassPosition[1]
    this.base.scale.x = props.scale || 1
    this.base.scale.y = props.scale || 1
    this.base.alpha = 0
  }
}

class SingleGlass extends PixiComponent {
  setup (props) {
    this.type = props.type || 'b'

    this.base = new Sprite(store.animations.get()['glass-' + names[props.id] + '.png'][0])
    this.base.isHidden = true
    this.base.x = positionsUnbuilded[props.id][0]
    this.base.y = positionsUnbuilded[props.id][1]
    this.base.scale.x = props.scale || 1
    this.base.scale.y = props.scale || 1
    this.base.rotation = rotation[props.id]
    this.base.alpha = 0
  }
}

export default class Glass extends PixiComponent {
  setup (props) {
    this.sigleGlasses = []
    this.number = 7

    this.base = new Container()
    this.base.x = props.x || 0
    this.base.y = props.y || 0
    this.width = this.base.width
    this.height = this.base.height

    for (let i = 0; i < this.number; i++) {
      this.sigleGlasses.push(this.addComponent(SingleGlass, { id: i, scale: props.scale }))
    }

    this.bigGlass = this.addComponent(BigGlass, { scale: 0.56 })
  }

  componentDidMount () {
    this.updateVisibility = this.fastbind('updateVisibility', 1)
    this.construct = this.fastbind('construct', 1)
  }

  show () {
    this.sigleGlasses.forEach((el, i) => {
      if (!el.isHidden) return
      el.isHidden = false
      anime({
        targets: el.base,
        alpha: 1,
        duration: 300,
        easing: 'easeOutQuad'
      })
    })
  }

  hide () {
    this.sigleGlasses.forEach((el, i) => {
      if (el.isHidden || this.constructed) return
      el.isHidden = true
      anime({
        targets: el.base,
        alpha: 0,
        duration: 300,
        easing: 'easeOutQuad'
      })
    })
  }

  construct () {
    if (this.constructed) return
    this.constructed = true
    this.sigleGlasses.forEach((el, i) => {
      anime({
        targets: el.base,
        x: positionsBuilded[i][0],
        y: positionsBuilded[i][1],
        rotation: 0,
        easing: 'easeOutQuad',
        duration: 600
      })
      anime({
        targets: el.base,
        alpha: 0,
        easing: 'easeOutQuad',
        duration: 600,
        delay: 900
      })
    })
    anime({
      targets: this.bigGlass.base,
      alpha: 1,
      easing: 'easeOutQuad',
      duration: 600,
      delay: 1200
    })
  }

  updateVisibility (collide) {
    if (collide) this.show()
    else this.hide()
  }

  componentWillUnmount () {
    this.sigleGlasses = undefined
  }
}
