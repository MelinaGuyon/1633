import PixiComponent from 'abstractions/PixiComponent'
import Colliders from 'abstractions/Colliders'
import store from 'state/store'
import signals from 'state/signals'

export default class Interests extends PixiComponent {
  setup (props) {
    this.props = props
    this.facts = []
    this.mains = []
    this.mains.push(this.addComponent(Colliders, { layer: '1bg200', levelId: 1, x: 0, y: -100, group: 'interests', collide: true, tint: 0xFF0000, cb: this.cb.bind(this, (store.chronologieIdsTable.get()[0])) }))

    this.bind()
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
