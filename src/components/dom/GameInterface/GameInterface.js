import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import Menu from 'components/dom/Menu/Menu'
import Carrousel from 'components/dom/Carrousel/Carrousel'

import './GameInterface.styl'

export default class GameInterface extends DomComponent {
  template ({ base }) {
    return (
      <section class='game'>
        <Menu />
        <Carrousel />
      </section>
    )
  }

  componentDidMount () {
    console.log('Game interface did mount')
  }
}
