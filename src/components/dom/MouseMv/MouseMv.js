import { DomComponent } from 'abstractions/DomComponent'
import { h } from '@internet/dom'

import './MouseMv.styl'

export default class MouseMv extends DomComponent {
  template ({ base }) {
    return (
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
