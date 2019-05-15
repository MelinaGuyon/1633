import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import Menu from 'components/dom/Menu/Menu'
import Carrousel from 'components/dom/Carrousel/Carrousel'
import Chronologie from 'components/dom/Chronologie/Chronologie'
import Subtitles from 'components/dom/Subtitles/Subtitles'
import MouseMv from 'components/dom/MouseMv/MouseMv'
import Intro from 'components/dom/Intro/Intro'

import './GameInterface.styl'

export default class GameInterface extends DomComponent {
  template ({ base }) {
    return (
      <section class='game'>
        <Intro />
        <Menu />
        <Carrousel />
        <Chronologie />
        <Subtitles />
        <MouseMv />
      </section>
    )
  }

  componentDidMount () {
    console.log('Game interface did mount')
  }
}
