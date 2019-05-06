import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import anime from 'animejs'
import { map, delay } from 'lodash'

import './Subtitles.styl'

class SubtitlesContent extends DomComponent {
  template (props) {
    const loc = store.loc.get()
    this.actualLength = 0
    this.globalIndex = 0

    console.log('context this', this)
    console.log('SubtitleContent', SubtitlesContent)

    return (
      <div class='subtitles-content' data-id={props.id}>{loc['nav.' + props.type]}</div>
    )
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
    document.querySelector('.subtitles-content').innerHTML = line.text
    if (line.lineIndex === this.actualLength) delay(this.remove, 2000)
  }

  remove () {
    document.querySelector('.subtitles-content').innerHTML = ''
  }

  hideSubtitles () {
    document.querySelector('.subtitles').classList.add('is-hidden')
  }

  showSubtitles () {
    document.querySelector('.subtitles').classList.remove('is-hidden')
  }

  componentDidMount () {
    this.writeSubtitles(store.subtitles.get()[4], 4)
  }
}

export default class Subtitles extends DomComponent {
  template ({ base }) {
    return (
      <section class='subtitles'>
        <SubtitlesContent type={'subtitles'} id={0} />
      </section>
    )
  }

  componentDidMount () {
  }
}
