import { DomComponent } from 'abstractions/DomComponent'
import { h, addRef } from '@internet/dom'
import signals from 'state/signals'

import './Indications.styl'

const locs = [
  'Click and hold',
  'Scroll'
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
    signals.newIndication.listen(this.setIndication, this)
  }

  setIndication (indication) {
    if (indication === 0) this.indications.classList.remove('is-visible')
    else {
      this.indications.innerText = locs[indication - 1]
      this.indications.classList.add('is-visible')
    }
  }
}
