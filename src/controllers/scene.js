import { Container } from 'pixi.js'
import store from 'state/store'
import PixiComponent from 'abstractions/PixiComponent'
import camera from 'controllers/camera'

class SceneLayer extends PixiComponent {
  setup (props) {
    this.base = new Container()
    this.z = props.z
    this.x = props.x
    this.name = props.name

    this.base.x = Math.round(store.size.get().w / 2 * this.x)
    this.base.y = Math.round(store.size.get().h / 2)
  }
}

class Scene extends PixiComponent {
  setup () {
    this.base = new Container()
    this.createLayers()
    this.resize()
  }

  createLayers () {
    const layers = store.sceneLayers.get()
    this.layers = {}
    this.scale = 1

    // Create parallax layers
    for (let i = 0; i < layers.length; i++) {
      const name = layers[i][0]
      let x = Number(name.substring(0, 1))
      if (isNaN(x)) x = 1
      const layer = this.addComponent(SceneLayer, { z: layers[i][1], x, name: name })
      this.layers[name] = layer
      if (!this[name]) this[name] = layer
    }

    this.layersKeys = Object.keys(this.layers)
  }

  goPos (layer) {
    let z = this.scale
    layer.base.scale.x = z
    layer.base.scale.y = z
    layer.scale = z

    if (layer.props.name === 'hero') {
      layer.base.x = Math.round(store.size.get().w / 2 * layer.x)
      layer.base.y = Math.round(store.size.get().h / 2)
    } else {
      let p = layer.z * 0.001
      const x = camera.x + camera.x * p
      const y = camera.y + camera.y * p
      layer.base.x = Math.round((store.size.get().w / 2 + x) * layer.x)
      layer.base.y = Math.round(store.size.get().h / 2 + y)
    }
  }

  resize (s) {
    if (!s) s = store.size.get()

    let scale
    scale = Math.max(
      0.9,
      Math.min(
        0.9 + (Math.max(1, s.w / 700) - 1) * 1.2,
        0.9 + (Math.max(1, s.h / 700) - 1) * 1.5
      )
    )

    this.screenWidth = s.w
    this.screenHeight = s.h
    this.width = s.w / scale
    this.height = s.h / scale

    this.scale = scale
    store.sceneScale.set(scale)

    super.resize(s)
  }

  update (dt) {
    let n = this.layersKeys.length
    while (n--) {
      let layer = this.layers[this.layersKeys[n]]
      this.goPos(layer)
    }
    super.update(dt)
  }
}

const scene = new Scene()
export default scene // Expose a singleton
