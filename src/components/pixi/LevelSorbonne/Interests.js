import PixiComponent from 'abstractions/PixiComponent'
import Colliders from 'abstractions/Colliders'
import store from 'state/store'
import signals from 'state/signals'

export default class Interests extends PixiComponent {
  setup () {
    this.facts = []

    this.mains = []
    this.mains.push(this.addComponent(Colliders, { layer: '9bg200', levelId: 9, x: 100, y: -100, group: 'interests', collide: true, tint: 0xFF0000, cb: this.cb.bind(this, 8) }))

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
      signals.factUnlock.dispatch(id)
    }
  }

  componentWillUnmount () {
    this.mains = undefined
    this.unbind()
  }
}
