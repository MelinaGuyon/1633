import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'
import { Container } from 'pixi.js'

export default class Animations extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}

    this.refs.photographe = this.addChild('photographe', { layer: '11bg500', x: -235, y: 15 })
    this.refs.photographe.scale.x = 0.62
    this.refs.photographe.scale.y = 0.62
    this.animPhotographe = new Animator(this.refs.photographe)
    this.animPhotographe.play('photographe', { loop: true, frameDuration: 250 })
  }

  componentWillUnmount () {
    this.animPhotographe.dispose()
  }

  update (dt) {
    this.animPhotographe.update(dt)
  }
}