import { Container, autoDetectRenderer, settings, PRECISION } from 'pixi.js'
import { raf } from '@internet/raf'
import scene from 'controllers/scene'
import camera from 'controllers/camera'
import physics from 'controllers/physics'
import PixiComponent from 'abstractions/PixiComponent'
import sound from 'controllers/sound'

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
    autoResize: false,
    roundPixels: true,
    transparent: true
  })
  // 0x0b1528 old background

  settings.PRECISION_FRAGMENT = PRECISION.HIGH

  renderer.view.classList.add('app-canvas')
  view = renderer.view
  camera.setup()
  scene.setup()

  stage = new Container()
  stage.addChild(scene.base)

  store.size.listen(resize)
  raf.add(render)
}

function render (dt) {
  // dt adjustements (timescale, time computation)
  const playing = !store.pause.get().paused
  if (playing) {
    dt = dt * 1 // see part 'force pixalated rendering
    time += dt
  } else {
    dt = 0
  }

  if (playing) physics.update(dt, time)
  camera.update(dt, time)
  scene.update(dt, time)
  gameComponent.update(dt, time)
  renderer.render(stage)
  sound.update(dt)
}

function resize (s) {
  renderer.resize(s.w, s.h)
  view.style.width = s.w + 'px'
  view.style.height = s.h + 'px'

  scene.resize(s)
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
