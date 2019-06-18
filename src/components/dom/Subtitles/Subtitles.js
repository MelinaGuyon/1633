import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import signals from 'state/signals'
import anime from 'animejs'
import { map, delay } from 'lodash'

import './Subtitles.styl'

export default class Subtitles extends DomComponent {
  template (props) {
    this.actualLength = 0
    this.globalIndex = 0
    this.actualReading = 0

    return (
      <section class='subtitles' ref={addRef(this, 'subtiltles')} >
        <div class='subtitles-content' ref={addRef(this, 'subtiltlesContent')} />
      </section>
    )
  }

  componentDidMount () {
    this.initWritting = this.initWritting.bind(this)
    this.bind()
  }

  bind () {
    signals.writeSubtitles.listen(this.initWritting)
  }

  initWritting (index) {
    this.writeSubtitles(store.subtitles.get()[index], index, Date.now())
  }

  writeSubtitles (block, blockIndex, datetime) {
    this.actualLength = block.length - 1
    this.globalIndex = blockIndex
    this.actualReading = datetime
    map(block, this.write.bind(this, blockIndex, datetime))
  }

  write (blockIndex, datetime, line, lineIndex) {
    delay(this.writeOne.bind(this), line[1], { text: line[0], lineIndex, blockIndex, datetime })
  }

  writeOne (line) {
    // vérification qu'il s'agit toujours du même bloc de sous-titres sinon return
    if (line.blockIndex !== this.globalIndex || line.datetime !== this.actualReading) return
    this.subtiltlesContent.innerHTML = line.text
  }

  remove () {
    this.subtiltlesContent.innerHTML = ''
  }

  hideSubtitles () {
    this.subtiltles.classList.add('is-hidden')
  }

  showSubtitles () {
    this.subtiltles.classList.remove('is-hidden')
  }
}
