import PixiComponent from 'abstractions/PixiComponent'
import Colliders from 'abstractions/Colliders'
import store from 'state/store'
import signals from 'state/signals'

export default class Interests extends PixiComponent {
  setup () {
    this.facts = []

    this.mains = []
    this.mains.push(this.addComponent(Colliders, { layer: '7bg200', levelId: 7, x: 100, y: -100, group: 'interests', collide: true, tint: 0xFF0000, cb: this.cb.bind(this, 0) }))
    // this.mains.push(this.addComponent(Colliders, { layer: '2bg200', x: 400, y: -100, group: 'interests', collide: true, tint: 0xFF0000, cb: this.cb.bind(this, 1) }))

    this.bind()
  }

  bind () {
    signals.space.listen(this.checkInterest, this)
  }

  unbind () {
    signals.space.unlisten(this.checkInterest)
  }

  cb (idHistoryFact, state) {
    if (state.collide) this.facts[idHistoryFact] = idHistoryFact
    else this.facts[idHistoryFact] = null
  }

  checkInterest () {
    this.facts.forEach((id) => {
      if (id !== null) this.unlock(id)
    })
  }

  unlock (id) {
    if (id >= 0) {
      store.factsStatus.current[id] = 'unlocked'
      document.querySelector('#fact' + id + ' .factContent').style.opacity = 0.5
    }
  }

  componentWillUnmount () {
    this.mains = undefined
    this.unbind()
  }
}
