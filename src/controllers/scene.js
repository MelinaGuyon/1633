import { Container } from 'pixi.js'
import store from 'state/store'
import PixiComponent from 'abstractions/PixiComponent'
import camera from 'controllers/camera'

class SceneLayer extends PixiComponent {
  setup (props) {
    this.base = new Container()
    this.z = props.z
    this.x = props.x || 1
    this.id = props.id
    this.name = props.name
    this.displacementX = 0

    this.base.x = Math.round(store.size.get().w / 2 * this.x)
    this.base.y = Math.round(store.size.get().h / 2)
  }
}

class Scene extends PixiComponent {
  setup () {
    this.base = new Container()
    this.sizes = []
    this.offsets = []
    this.interestOffsets = []
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
      let id = Number(name.substring(0, 1))
      if (isNaN(id)) id = 0
      const layer = this.addComponent(SceneLayer, { z: layers[i][1], id, name: name })
      this.layers[name] = layer
      this.sizes[layer.id] = 0
      if (!this[name]) this[name] = layer
    }

    this.layersKeys = Object.keys(this.layers)
  }

  goPos (layer) {
    let z = this.scale
    layer.base.scale.x = z
    layer.base.scale.y = z
    layer.scale = z

    // calc offest of each chapters
    // TODO voir si on peut arreter de calculer un fois qu'on a déjà en stock
    // ou plutot checker si on a changé de niveau
    let offset = 0
    for (let i = 1; i < layer.id; i++) {
      offset += this.sizes[i]
    }
    this.offsets[layer.id] = offset

    if (layer.props.name === 'hero') {
      layer.base.x = Math.round(store.size.get().w / 2)
      layer.base.y = Math.round(store.size.get().h / 2)
    } else {
      let p = layer.z * 0.001
      // l'offset du layer actuel + sa size divisée par 2, - la size du premier chapitre divisée par 2 vu que perso commence au centre
      const center = this.offsets[layer.id] + this.sizes[layer.id] / 2 - this.sizes[1] / 2
      const dx = camera.x + center

      if (Math.abs(dx) < this.sizes[layer.id] / 2) {
        // displacement quand zone de parralax active pour chaque layer indépendemment
        layer.displacementX = this.offsets[layer.id] + camera.x
      } else if (Math.abs(camera.x) < this.offsets[layer.id]) {
        // placement avec displacement initial pour ne pas popper quand on arrive sur le layer
        layer.displacementX = this.sizes[layer.id] / 2
      }

      const x = camera.x + layer.displacementX * p
      const y = camera.y + camera.y * p
      layer.base.x = Math.round(store.size.get().w / 2 + x + offset)
      layer.base.y = Math.round(store.size.get().h / 2 + y)
    }
  }

  updateSizes (layer) {
    // TODO voir si on peut arreter de calculer un fois qu'on a déjà en stock
    if (this.sizes[layer.id] < layer.base.width) this.sizes[layer.id] = layer.base.width + 200
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
      this.updateSizes(layer)
    }

    n = this.layersKeys.length
    while (n--) {
      let layer = this.layers[this.layersKeys[n]]
      this.goPos(layer)
    }
    super.update(dt)
  }
}

const scene = new Scene()
export default scene // Expose a singleton
