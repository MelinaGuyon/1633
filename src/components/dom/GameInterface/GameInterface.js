import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import Menu from 'components/dom/Menu/Menu'
import Carrousel from 'components/dom/Carrousel/Carrousel'
import Timeline from 'components/dom/Timeline/Timeline'
import Chronologie from 'components/dom/Chronologie/Chronologie'
import ChronologieTimeline from 'components/dom/ChronologieTimeline/ChronologieTimeline'
import About from 'components/dom/About/About'
import Subtitles from 'components/dom/Subtitles/Subtitles'
import Tutorial from 'components/dom/Tutorial/Tutorial'
import SoundTimeline from 'components/dom/SoundTimeline/SoundTimeline'
import Debug from 'components/dom/Debug/Debug'
import Epilogue from 'components/dom/Epilogue/Epilogue'
import logger from 'utils/logger'
import signals from 'state/signals'

import './GameInterface.styl'
import store from '../../../state/store'

export default class GameInterface extends DomComponent {
  template ({ base }) {
    return (
      <section class='game'>
        <Menu />
        <Carrousel />
        <Chronologie />
        <ChronologieTimeline />
        <About />
        <Timeline />
        <Subtitles />
        <Tutorial />
        <Epilogue />
        <SoundTimeline />
        {/* <Debug /> */}
      </section>
    )
  }

  componentDidMount () {
    logger('Game interface did mount', '#47b342').log()
    this.bind()
    signals.newDom.dispatch()
  }

  componentWillUnmount () {
    this.unbind()
  }

  bind () {
    this.listenStore('size', this.resize)
    document.addEventListener('click', this.clearClick)
    signals.moreNoise.listen(this.updateNoise)
  }

  unbind () {
    this.unlistenStore('size', this.resize)
    document.removeEventListener('click', this.clearClick)
    signals.moreNoise.unlisten(this.updateNoise)
  }

  updateNoise (moreNoise) {
    if (moreNoise) document.body.classList.add('more-noise')
    else document.body.classList.remove('more-noise')
  }

  clearClick (e) {
    if (document.activeElement.toString() === '[object HTMLButtonElement]') {
      document.activeElement.blur()
    }
  }

  resize () {
    signals.newDom.dispatch()
  }
}
