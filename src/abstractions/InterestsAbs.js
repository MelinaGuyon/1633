/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import PixiComponent from 'abstractions/PixiComponent'
import signals from 'state/signals'

export default class InterestsAbs extends PixiComponent {
  setup () {
    this.mains = []
  }

  bind () {
    signals.space.listen(this.checkInterest, this)
  }

  unbind () {
    signals.space.unlisten(this.checkInterest)
  }

  cb (idHistoryFact, state) {
    if (state.collide) {
      this.props.onCollide && this.props.onCollide(1)
      this.facts[idHistoryFact] = idHistoryFact
    } else {
      this.facts[idHistoryFact] = null
      this.props.onCollide && this.props.onCollide(0)
    }
  }

  checkInterest () {
    this.facts.forEach((id) => {
      if (id !== null) this.unlock(id)
    })
  }

  unlock (id) {
    if (id >= 0) {
      this.props.unlock && this.props.unlock()
      signals.factUnlock.dispatch(id)
    }
  }

  componentWillUnmount () {
    this.mains = undefined
    this.unbind()
  }
}
