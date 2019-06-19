import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'
import { Container } from 'pixi.js'

export default class Animations extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}

    this.refs.drap = this.addChild('draps', { layer: '3bg600', x: -370, y: -210 })
    this.refs.drap.scale.x = 0.6
    this.refs.drap.scale.y = 0.6
    this.animDrap = new Animator(this.refs.drap)
    this.animDrap.play('draps', { loop: true, frameDuration: 160 })

    this.refs.lampe = this.addChild('lampeBaschamp', { layer: '3bg600', x: -50, y: -245 })
    this.refs.lampe.scale.x = 0.59
    this.refs.lampe.scale.y = 0.59
    this.animLampe = new Animator(this.refs.lampe)
    this.animLampe.play('lampeBaschamp', { loop: true, frameDuration: 160 })
  }

  componentWillUnmount () {
    this.animDrap.dispose()
    this.animLampe.dispose()
  }

  update (dt) {
    this.animDrap.update(dt)
    this.animLampe.update(dt)
  }
}