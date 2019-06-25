import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'

import './Disclaimer.styl'

export default class Epilogue extends DomComponent {
  template ({ base }) {
    const loc = store.loc.get()

    return (
      <section class='disclaimer' ref={addRef(this, 'disclaimer')}>
        <p class='text'>
          {loc['disclaimer.text']}
        </p>
      </section>
    )
  }
}
