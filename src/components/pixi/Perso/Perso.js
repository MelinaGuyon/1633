import { Container } from 'pixi.js'
import PixiComponent from 'abstractions/PixiComponent'

export default class Perso extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}

    this.refs.perso = this.addChild('elle-0/idle')
  }
}
