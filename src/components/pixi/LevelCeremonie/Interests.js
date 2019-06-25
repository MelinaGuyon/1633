import Colliders from 'abstractions/Colliders'
import InterestsAbs from 'abstractions/InterestsAbs'
import store from 'state/store'

export default class Interests extends InterestsAbs {
  setup () {
    this.facts = []

    this.mains = []
    if (store.isPrez.get()) {
      this.mains.push(this.addComponent(Colliders, { layer: '6bg200', levelId: 8, x: 0, y: -100, group: 'interests', collide: true, alpha: 0, tint: 0xFF0000, cb: this.cb.bind(this, (store.chronologieIdsTable.get()[7])) }))
    } else {
      this.mains.push(this.addComponent(Colliders, { layer: '8bg200', levelId: 8, x: 0, y: -100, group: 'interests', collide: true, alpha: 0, tint: 0xFF0000, cb: this.cb.bind(this, (store.chronologieIdsTable.get()[7])) }))
    }

    this.bind()
  }
}
