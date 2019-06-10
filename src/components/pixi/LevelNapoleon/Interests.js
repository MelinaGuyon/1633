import Colliders from 'abstractions/Colliders'
import InterestsAbs from 'abstractions/InterestsAbs'
import store from 'state/store'

export default class Interests extends InterestsAbs {
  setup () {
    this.facts = []

    this.mains = []
    this.mains.push(this.addComponent(Colliders, { layer: '6bg200', levelId: 6, x: 100, y: -100, group: 'interests', collide: true, tint: 0xFF0000, cb: this.cb.bind(this, (store.chronologieIdsTable.get()[5])) }))

    this.bind()
  }
}
