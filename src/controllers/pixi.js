import { Container, autoDetectRenderer, settings, PRECISION } from 'pixi.js'
import { raf } from '@internet/raf'
import scene from 'controllers/scene'

import store from 'state/store'


let renderer
let view
let stage


function init () {
  renderer = autoDetectRenderer({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: false,
    resolution: store.pixelRatio.get(),
    backgroundColor: 0x000000,
    autoResize: false,
  })

  renderer.view.classList.add('app-canvas')
  view = renderer.view
  stage = new Container()


  scene.setup()

    console.log("SCENE", scene)

  stage.addChild(scene.getBase())

  raf.add(render)
}

function render (dt) {
  renderer.render(stage)
}

export default {
  init,
  getView () { return view },
  getRenderer () { return renderer }
}

