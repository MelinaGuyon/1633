import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import logger from 'utils/logger'

import './Message.styl'

export default class GameInterface extends DomComponent {
  template ({ base }) {
    return (
      <section class='message' >
        <div>Information ajoutée à la chronologie</div>
      </section>
    )
  }

  componentDidMount () {
    logger('Message interface did mount', '#47b342').log()
  }

  componentWillUnmount () {
  }
}
