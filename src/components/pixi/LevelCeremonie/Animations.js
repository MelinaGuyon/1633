import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'
import { Container } from 'pixi.js'

export default class Animations extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}

    this.refs.empereur = this.addChild('empereur', { layer: '8bg400', x: 480, y: -70 })
    this.refs.empereur.scale.x = 0.66
    this.refs.empereur.scale.y = 0.66
    this.animEmpereur = new Animator(this.refs.empereur)
    this.animEmpereur.play('empereur', { loop: true, frameDuration: 160 })

    // this.refs.hommeSceptre = this.addChild('hommeSceptre', { layer: '8bg500', x: -210, y: -120 })
    // this.refs.hommeSceptre.scale.x = 0.63
    // this.refs.hommeSceptre.scale.y = 0.63
    // this.animHommeSceptre = new Animator(this.refs.hommeSceptre)
    // this.animHommeSceptre.play('hommeSceptre', { loop: true, frameDuration: 250 })
  }

  componentWillUnmount () {
    this.animEmpereur.dispose()
    // this.animHommeSceptre.dispose()
  }

  update (dt) {
    this.animEmpereur.update(dt)
    // this.animHommeSceptre.update(dt)
  }
}
