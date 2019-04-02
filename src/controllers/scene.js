import { Container } from 'pixi.js'

import store from 'state/store'

let base


function Scene() {
  console.log("pouet")

  function setup() {
    base = new Container()

    let graphics = new PIXI.Graphics()
    graphics.beginFill(0xFFFF00)
    graphics.lineStyle(5, 0xFF0000)
    graphics.drawRect(0, 0, 300, 200)

    base.addChild(graphics)
  }

  return { setup, getBase () { return base }}
}


const scene = new Scene()
export default scene

