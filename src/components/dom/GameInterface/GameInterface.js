import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import Menu from 'components/dom/Menu/Menu'
import Carrousel from 'components/dom/Carrousel/Carrousel'
import Timeline from 'components/dom/Timeline/Timeline'
import Chronologie from 'components/dom/Chronologie/Chronologie'
import Subtitles from 'components/dom/Subtitles/Subtitles'
import Tutorial from 'components/dom/Tutorial/Tutorial'

import './GameInterface.styl'

export default class GameInterface extends DomComponent {
  template ({ base }) {
    return (
      <section class='game'>
        <Menu />
        <Carrousel />
        <Timeline />
        <Chronologie />
        <Subtitles />
        <Tutorial />
      </section>
    )
  }

  componentDidMount () {
    console.log('Game interface did mount')
    document.addEventListener('click', function (e) {
      if (document.activeElement.toString() === '[object HTMLButtonElement]') {
        document.activeElement.blur()
      }
    })
  }
}
