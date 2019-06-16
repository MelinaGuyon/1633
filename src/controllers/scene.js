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
    this.parralaxValue = props.parralaxValue // ref value given in sceneLayers
    this.displacementX = 0 // displacement value in px du to parallax value

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
    this.needsUpdate = true

    this.bind()
    this.createLayers()
    this.resize()
  }

  componentWillUnmount () {
    this.unbind()
  }

  bind () {
    this.listenStore('levelId', this.onLvlChange)
  }

  unbind () {
    this.unlistenStore('levelId', this.onLvlChange)
  }

  createLayers () {
    const layers = store.sceneLayers.get()
    this.layers = {}
    this.scale = 1

    // Create parallax layers
    for (let i = 0; i < layers.length; i++) {
      const name = layers[i][0]

      let id = 0
      let oneTaken = Number(name.substring(0, 1))
      let twoTaken = Number(name.substring(0, 2))

      if (!isNaN(oneTaken)) id = oneTaken
      if (!isNaN(twoTaken)) id = twoTaken

      const layer = this.addComponent(SceneLayer, { z: layers[i][1], parralaxValue: layers[i][2], id, name: name })
      this.layers[name] = layer
      this.sizes[layer.id] = 0
      if (!this[name]) this[name] = layer
    }

    this.layersKeys = Object.keys(this.layers)
  }

  goPos (layer) {
    let s = this.scale
    layer.base.scale.x = s
    layer.base.scale.y = s
    layer.scale = s

    // calc offest of each chapters
    if (this.needsUpdate) {
      let offset = this.sizes[1]
      for (let i = 1; i < layer.id; i++) {
        offset += (this.sizes[i] / 2) + this.sizes[i + 1] / 2
      }
      this.offsets[layer.id] = offset
    }

    if (layer.props.name === 'hero') {
      layer.base.x = Math.round(store.size.get().w / 2)
      layer.base.y = Math.round(store.size.get().h / 2)
    } else {
      let p = layer.parralaxValue * 0.001
      // l'offset du layer actuel + sa size divisée par 2, - la size du premier chapitre divisée par 2 vu que perso commence au centre
      const center = this.offsets[layer.id]
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
      layer.base.x = Math.round(store.size.get().w / 2 + x + this.offsets[layer.id])
      layer.base.y = Math.round(store.size.get().h / 2 + y)
    }
  }

  updateSizes (layer) {
    if (!this.needsUpdate) return
    if (this.sizes[layer.id] < layer.base.width) this.sizes[layer.id] = layer.base.width + 500 // 500
  }

  setLevelId () {
    let levelId
    for (let i = 1; i < this.offsets.length; i++) {
      if ((this.offsets[i] - this.sizes[i] / 2) < camera.x * -1) levelId = i - 1
    }
    if (store.levelId.get() !== levelId) store.levelId.set(levelId)
  }

  onLvlChange () {
    this.needsUpdate = true
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

    this.needsUpdate = true
    super.resize(s)
  }

  update (dt) {
    this.setLevelId()

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

    if (this.needsUpdate) this.needsUpdate = false

    super.update(dt)
  }
}

const scene = new Scene()
export default scene // Expose a singleton
