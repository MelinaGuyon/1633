import Colliders from 'abstractions/Colliders'
import InterestsAbs from 'abstractions/InterestsAbs'
import store from 'state/store'

export default class Interests extends InterestsAbs {
  setup (props) {
    this.props = props
    this.facts = []
    this.mains = []
    this.mains.push(this.addComponent(Colliders, { layer: '1bg0', levelId: 1, x: 0, y: -100, group: 'interests', collide: true, alpha: 0, tint: 0xFF0000, cb: this.cb.bind(this, (store.chronologieIdsTable.get()[0])) }))

    this.bind()
  }
}
