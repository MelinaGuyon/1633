import PixiComponent from 'abstractions/PixiComponent'
import Colliders from 'abstractions/Colliders'
import store from 'state/store'
import signals from 'state/signals'
import cookie from '../../../controllers/cookie'

export default class TutoCheck extends PixiComponent {
  setup () {
    this.mains = []
    // this.mains.push(this.addComponent(Colliders, { layer: '1bg10', x: -200, y: -100, group: 'tuto', collide: true, tint: 0x3366ff, cb: this.cb.bind(this, 'space'), name: 'space' }))
  }

  openTuto (id) {
    // cookie.createCookie('tuto', true, 30)
    signals.activeTuto.dispatch(id)
    store.pause.set({ paused: true, allMuted: false })

    for (let i = 0; i < this.mains.length; i++) {
      if (this.mains[i].name === id) {
        this.mains[i].destroy()
      }
    }
  }

  cb (id, state) {
    if (state.collide) {
      this.openTuto(id)
    }
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
