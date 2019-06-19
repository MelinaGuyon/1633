import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'
import { Container } from 'pixi.js'

export default class Animations extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}

    this.refs.bougiePharmacie = this.addChild('bougiePharmacie', { layer: '7bg600', x: 65, y: -80 })
    this.refs.bougiePharmacie.scale.x = 0.65
    this.refs.bougiePharmacie.scale.y = 0.65
    this.animBougiePharmacie = new Animator(this.refs.bougiePharmacie)
    this.animBougiePharmacie.play('bougiePharmacie', { loop: true, frameDuration: 160 })

    this.refs.lampePharmacie = this.addChild('lampePharmacie', { layer: '7bg600', x: -125, y: -285 })
    this.refs.lampePharmacie.scale.x = 0.61
    this.refs.lampePharmacie.scale.y = 0.61
    this.animLampePharmacie = new Animator(this.refs.lampePharmacie)
    this.animLampePharmacie.play('lampePharmacie', { loop: true, frameDuration: 250 })
  }

  componentWillUnmount () {
    this.animBougiePharmacie.dispose()
    this.animLampePharmacie.dispose()
  }

  update (dt) {
    this.animBougiePharmacie.update(dt)
    this.animLampePharmacie.update(dt)
  }
}