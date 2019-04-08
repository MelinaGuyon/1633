import { Container } from 'pixi.js'
import store from 'state/store'
import PixiComponent from 'abstractions/PixiComponent'

class SceneLayer extends PixiComponent {
  setup (props) {
    this.base = new Container()
    this.z = props.z

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
      const layer = this.addComponent(SceneLayer, { z: layers[i][1] })
      this.layers[name] = layer
      if (!this[name]) this[name] = layer
    }

    this.layersKeys = Object.keys(this.layers)
  }
}

const scene = new Scene()
export default scene
