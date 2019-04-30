import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import Menu from 'components/dom/Menu/Menu'
import Timeline from 'components/dom/Timeline/Timeline'

import './GameInterface.styl'

export default class GameInterface extends DomComponent {
  template ({ base }) {
    return (
      <section class='game'>
        <Menu />
        <Timeline />     
      </section>
    )
  }

  componentDidMount () {
    console.log('Game interface did mount')
  }
}
