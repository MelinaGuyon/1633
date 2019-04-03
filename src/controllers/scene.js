import { Container } from 'pixi.js'

import store from 'state/store'

let base


function Scene() {

  let backView, floor, frontView

  function setup() {
    base = new Container()

    // setBackView()
    // //setFloor()
    // setFrontView()
  }


  function setBackView() {
    backView = PIXI.Sprite.fromImage("assets/backView.jpg")
    base.addChild(backView)
  }


  function setFloor() {
    floor = PIXI.Sprite.fromImage("assets/floor.jpg")
    floor.y = 591 // backView height
    base.addChild(floor)
  }

  function setFrontView() {
    frontView = PIXI.Sprite.fromImage("assets/frontView.png")
    frontView.y = window.innerHeight - 390 // frontView height
    base.addChild(frontView)
  }

  return { setup, getBase () { return base }}
}


const scene = new Scene()
export default scene