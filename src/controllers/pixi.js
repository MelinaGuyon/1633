import { Container, autoDetectRenderer } from 'pixi.js'
import { raf } from '@internet/raf'
import scene from 'controllers/scene'
import camera from 'controllers/camera'
import PixiComponent from 'abstractions/PixiComponent'

import store from 'state/store'

let renderer
let view
let stage

let gameComponent = new PixiComponent()
let time = 0

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
  camera.setup()
  scene.setup()

  stage = new Container()
  stage.addChild(scene.base)

  raf.add(render)
}

function render (dt) {
  // dt adjustements (timescale, time computation)
  const playing = !store.pause.get()
  if (playing) {
    dt = dt * 1 // see part 'force pixalated rendering
    time += dt
  } else {
    dt = 0
  }

  camera.update(dt, time)
  scene.update(dt, time)
  gameComponent.update(dt, time)
  renderer.render(stage)
}

function setGameComponent (c) {
  gameComponent = c
}

export default {
  init,
  setGameComponent,
  getView () { return view },
  getRenderer () { return renderer }
}
