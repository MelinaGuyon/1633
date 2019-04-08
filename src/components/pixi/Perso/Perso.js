import { Graphics, Container } from 'pixi.js'
import PixiComponent from 'abstractions/PixiComponent'

export default class Perso extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}

    this.refs.perso = this.addChild('elle-0/idle')

    console.log(this.refs.perso)
    // console.log(this.refs.elle, 'HERE')

    // let graphics = new Graphics()
    // graphics.beginFill(0xFFFF00)
    // graphics.lineStyle(5, 0xFF0000)
    // graphics.drawRect(0, 0, 300, 200)

    // base.addChild(graphics)
  }
}
