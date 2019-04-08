import { Container, autoDetectRenderer } from 'pixi.js'
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
    backgroundColor: 0xf9b85c,
    autoResize: false
  })

  renderer.view.classList.add('app-canvas')
  view = renderer.view
  scene.setup()

  stage = new Container()
  stage.addChild(scene.base)

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
