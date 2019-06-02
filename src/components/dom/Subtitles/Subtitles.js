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

    return (
      <section class='subtitles' ref={addRef(this, 'subtiltles')} >
        <div class='subtitles-content' ref={addRef(this, 'subtiltlesContent')} />
      </section>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    // TODO : unbind
    signals.writeSubtitles.listen(this.initWritting, this)
  }

  initWritting (index) {
    // this.writeSubtitles(store.subtitles.get()[index], index)
  }

  writeSubtitles (block, blockIndex) {
    this.actualLength = block.length - 1
    this.globalIndex = blockIndex
    map(block, this.write.bind(this, blockIndex))
  }

  write (blockIndex, line, lineIndex) {
    delay(this.writeOne.bind(this), line[1], { text: line[0], lineIndex, blockIndex })
  }

  writeOne (line) {
    // vérification qu'il s'agit toujours du même bloc de sous-titres sinon return
    if (line.blockIndex !== this.globalIndex) return
    this.subtiltlesContent.innerHTML = line.text
    if (line.lineIndex === this.actualLength) delay(this.remove.bind(this), 2000)
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
