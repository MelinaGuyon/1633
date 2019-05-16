import PixiComponent from 'abstractions/PixiComponent'
import Colliders from 'abstractions/Colliders'
import store from 'state/store'

export default class LevelCheck extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Colliders, { layer: '4bg600', x: 20, y: -100, group: 'levelChecks', collide: true, tint: 0x00F000, cb: this.cb.bind(this, 3) }))
  }

  cb (levelId, state) {
    if (state.collide) {
      const currentId = store.levelId.get()
      if (currentId !== levelId) store.levelId.set(levelId)
    }
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
