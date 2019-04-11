import { Container } from 'pixi.js'
import store from 'state/store'
import PixiComponent from 'abstractions/PixiComponent'
import camera from 'controllers/camera'

class SceneLayer extends PixiComponent {
  setup (props) {
    this.base = new Container()
    this.z = props.z
    this.name = props.name

    this.base.y = window.innerHeight / 2
    this.base.x = window.innerWidth / 2
  }
}

class Scene extends PixiComponent {
  setup () {
    this.base = new Container()
    this.createLayers()
  }

  createLayers () {
    const layers = store.sceneLayers.get()
    this.layers = {}

    // Create parallax layers
    for (let i = 0; i < layers.length; i++) {
      const name = layers[i][0]
      const layer = this.addComponent(SceneLayer, { z: layers[i][1], name: name })
      this.layers[name] = layer
      if (!this[name]) this[name] = layer
    }

    this.layersKeys = Object.keys(this.layers)
  }

  goPos (layer) {
    if (layer.props.name === 'hero') {
      layer.base.x = Math.round(store.size.get().w / 2)
      layer.base.y = Math.round(store.size.get().h / 2)
    } else {
      let p = layer.z * 0.001
      const x = camera.x + camera.x * p
      const y = camera.y + camera.y * p
      layer.base.x = Math.round(store.size.get().w / 2 + x)
      layer.base.y = Math.round(store.size.get().h / 2 + y)
    }
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
export default scene
