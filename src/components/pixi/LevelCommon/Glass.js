import PixiComponent from 'abstractions/PixiComponent'
import { Sprite, Container } from 'pixi.js'
import anime from 'animejs'

import store from 'state/store'

const names = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
const positionsBuilded = [
  [-100, -200],
  [-14, -230],
  [69, -174],
  [-100, -106],
  [69, -72],
  [-100, 58],
  [-94, 124]
]

const positionsUnbuilded = [
  [-350, -200],
  [-14, 120],
  [-108, -174],
  [-150, -86],
  [139, -40],
  [-320, 58],
  [0, 120]
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
      let sp = new Sprite(store.animations.get()['glass-' + names[i] + '.png'][0])
      sp.x = positionsUnbuilded[i][0]
      sp.y = positionsUnbuilded[i][1]
      sp.scale.x = props.scale || 1
      sp.scale.y = props.scale || 1
      sp.rotation = rotation[i]
      this.sprites.push(sp)
      this.base.addChild(sp)
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.animate()
    }, 3000)
  }

  animate () {
    console.log('animate')
    this.sprites.forEach((el, i) => {
      anime({
        targets: el,
        x: positionsBuilded[i][0],
        y: positionsBuilded[i][1],
        rotation: 0,
        easing: 'easeOutQuad'
      })
    })
  }
}
