/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */

import PixiComponent from 'abstractions/PixiComponent'
import signals from 'state/signals'

export default class InterestsAbs extends PixiComponent {
  setup () {
    this.mains = []
  }

  bind () {
    console.log('interest BINDED')
    this.checkInterest = this.checkInterest.bind(this)
    signals.space.listen(this.checkInterest)
  }

  unbind () {
    signals.space.unlisten(this.checkInterest)
  }

  cb (idHistoryFact, state) {
    // console.log('je passe dans cb', idHistoryFact, state)
    if (state.collide) {
      this.props.onCollide && this.props.onCollide(1)
      this.facts[idHistoryFact] = idHistoryFact
    } else {
      this.facts[idHistoryFact] = null
      this.props.onCollide && this.props.onCollide(0)
    }
  }

  checkInterest () {
    console.log('check')
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
    console.log('unbind interests')
  }
}
