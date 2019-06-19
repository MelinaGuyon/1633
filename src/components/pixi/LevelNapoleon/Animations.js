import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'
import { Container } from 'pixi.js'

export default class Animations extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}

    this.refs.chatBureau = this.addChild('chatBureau', { layer: '6bg600', x: -215, y: -254 })
    this.refs.chatBureau.scale.x = 0.64
    this.refs.chatBureau.scale.y = 0.64
    this.animChatBureau = new Animator(this.refs.chatBureau)
    this.animChatBureau.play('chatBureau', { loop: true, frameDuration: 160 })

    this.refs.lampeBureau = this.addChild('lampeBureau', { layer: '6bg600', x: 50, y: -220 })
    this.refs.lampeBureau.scale.x = 0.58
    this.refs.lampeBureau.scale.y = 0.58
    this.animLampeBureau = new Animator(this.refs.lampeBureau)
    this.animLampeBureau.play('lampeBureau', { loop: true, frameDuration: 160 })

    this.refs.bougieBureau = this.addChild('bougieBureau', { layer: '6bg500', x: 120, y: 20 })
    this.refs.bougieBureau.scale.x = 0.64
    this.refs.bougieBureau.scale.y = 0.64
    this.animBougieBureau = new Animator(this.refs.bougieBureau)
    this.animBougieBureau.play('bougieBureau', { loop: true, frameDuration: 250 })
  }

  componentWillUnmount () {
    this.animChatBureau.dispose()
    this.animLampeBureau.dispose()
    this.animBougieBureau.dispose()
  }

  update (dt) {
    this.animChatBureau.update(dt)
    this.animLampeBureau.update(dt)
    this.animBougieBureau.update(dt)
  }
}