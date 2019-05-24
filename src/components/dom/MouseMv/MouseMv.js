/* eslint-disable no-tabs */
import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'

import './MouseMv.styl'

export default class MouseMv extends DomComponent {
  template ({ base }) {
    return (
    //   <section class='mouse' />
      <div class='cursor-container'>
        <div class='ring'>
          <span class='outer'>
            <span class='inner' />
          </span>
        </div>
        <div class='dot' />
      </div>
    )
  }

  componentDidMount () {
  }
}
