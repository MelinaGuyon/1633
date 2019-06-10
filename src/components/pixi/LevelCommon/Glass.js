import PixiComponent from 'abstractions/PixiComponent'
import { Sprite, Container } from 'pixi.js'
import anime from 'animejs'

import store from 'state/store'

const names = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
const positionsBuilded = [
  [-160, -200],
  [-74, -230],
  [9, -174],
  [-160, -106],
  [9, -72],
  [-160, 58],
  [-154, 124]
]
const positionsUnbuilded = [
  [-250, -200],
  [86, 120],
  [-8, -174],
  [-50, -86],
  [239, -40],
  [-220, 58],
  [100, 120]
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
    this.sprites = []
    this.number = 7

    this.base = new Container()
    this.base.x = props.x || 0
    this.base.y = props.y || 0
    this.width = this.base.width
    this.height = this.base.height

    for (let i = 0; i < this.number; i++) {
      this.sprites.push(this.addComponent(SingleGlass, { id: i, scale: props.scale }))
    }
  }

  componentDidMount () {
    this.update = this.fastbind('update', 1)
    this.construct = this.fastbind('construct', 1)
  }

  show () {
    this.sprites.forEach((el, i) => {
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
    this.sprites.forEach((el, i) => {
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
    this.sprites.forEach((el, i) => {
      anime({
        targets: el.base,
        x: positionsBuilded[i][0],
        y: positionsBuilded[i][1],
        rotation: 0,
        easing: 'easeOutQuad'
      })
    })
  }

  update (collide) {
    if (collide) this.show()
    else this.hide()
  }
}
