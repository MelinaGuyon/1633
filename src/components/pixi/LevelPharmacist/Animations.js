import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'
import { Container } from 'pixi.js'

export default class Animations extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}

    this.refs.chatBretagne = this.addChild('chatBretagne', { layer: '5f100', x: -455, y: -10 })
    this.refs.chatBretagne.scale.x = 0.62
    this.refs.chatBretagne.scale.y = 0.62
    this.animChatBretagne = new Animator(this.refs.chatBretagne)
    this.animChatBretagne.play('chatBretagne', { loop: true, frameDuration: 160 })

    this.refs.arbre = this.addChild('arbre', { layer: '5bg300', x: 320, y: -100 })
    this.refs.arbre.scale.x = 0.61
    this.refs.arbre.scale.y = 0.61
    this.animArbre = new Animator(this.refs.arbre)
    this.animArbre.play('arbre', { loop: true, frameDuration: 160 })
  }

  componentWillUnmount () {
    this.animChatBretagne.dispose()
    this.animArbre.dispose()
  }

  update (dt) {
    this.animChatBretagne.update(dt)
    this.animArbre.update(dt)
  }
}