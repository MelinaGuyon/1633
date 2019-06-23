import { DomComponent } from 'abstractions/DomComponent'
import { h } from '@internet/dom'

import './MouseMv.styl'

export default class MouseMv extends DomComponent {
  template ({ base }) {
    return (
      <div class='cursor-container'>
        <div class='ring'>
          <div class='ring-holding'>
            <svg
              class='progress-ring'
              width='60'
              height='60'>
              <circle
                class='progress-ring__circle'
                stroke='white'
                stroke-width='3'
                fill='transparent'
                r='25'
                cx='30'
                cy='30' />
            </svg>
          </div>
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
