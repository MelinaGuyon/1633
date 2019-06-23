import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'
import { Container } from 'pixi.js'

export default class Animations extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}

    this.refs.lampeSorbonne = this.addChild('lampeSorbonne', { layer: '9f100', x: 260, y: -10 })
    this.refs.lampeSorbonne.scale.x = 0.66
    this.refs.lampeSorbonne.scale.y = 0.66
    this.animLampeSorbonne = new Animator(this.refs.lampeSorbonne)
    this.animLampeSorbonne.play('lampeSorbonne', { loop: true, frameDuration: 260 })

    this.refs.fumeeSorbonne = this.addChild('fumeeSorbonne', { layer: '9bg600', x: -420, y: -285 })
    this.refs.fumeeSorbonne.scale.x = 0.55
    this.refs.fumeeSorbonne.scale.y = 0.55
    this.animFumeeSorbonne = new Animator(this.refs.fumeeSorbonne)
    this.animFumeeSorbonne.play('fumeeSorbonne', { loop: true, frameDuration: 250 })

    this.refs.pluie = this.addChild('pluie', { layer: '9bg500', x: 30, y: -60 })
    this.refs.pluie.scale.x = 0.46
    this.refs.pluie.scale.y = 0.46
    this.animPluie = new Animator(this.refs.pluie)
    this.animPluie.play('pluie', { loop: true, frameDuration: 160 })
  }

  componentWillUnmount () {
    this.animLampeSorbonne.dispose()
    this.animFumeeSorbonne.dispose()
    this.animPluie.dispose()
  }

  update (dt) {
    this.animLampeSorbonne.update(dt)
    this.animFumeeSorbonne.update(dt)
    this.animPluie.update(dt)
  }
}