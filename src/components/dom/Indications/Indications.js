import { DomComponent } from 'abstractions/DomComponent'
import { h, addRef } from '@internet/dom'
import signals from 'state/signals'
import store from 'state/store'

import './Indications.styl'

const locs = [
  'cta.hold',
  'cta.scroll'
]

export default class Indications extends DomComponent {
  template ({ base }) {
    return (
      <span class='indications' ref={addRef(this, 'indications')} />
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.listenStore('started', this.fastbind('updateZIndex', 1))
    signals.newIndication.listen(this.setIndication, this)
  }

  updateZIndex (started) {
    if (started) this.base.classList.add('app-started')
    else this.base.classList.remove('app-started')
  }

  setIndication (indication) {
    if (indication === 0) this.indications.classList.remove('is-visible')
    else {
      const loc = store.loc.get()
      this.indications.innerText = loc[locs[indication - 1]]
      this.indications.classList.add('is-visible')
    }
  }
}
