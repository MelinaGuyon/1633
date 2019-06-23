import Colliders from 'abstractions/Colliders'
import InterestsAbs from 'abstractions/InterestsAbs'
import store from 'state/store'

export default class Interests extends InterestsAbs {
  setup () {
    this.facts = []

    this.mains = []
    this.mains.push(this.addComponent(Colliders, { layer: '8bg200', levelId: 8, x: 470, y: -100, group: 'interests', collide: true, alpha: 0, tint: 0xFF0000, cb: this.cb.bind(this, (store.chronologieIdsTable.get()[7])) }))

    this.bind()
  }
}
