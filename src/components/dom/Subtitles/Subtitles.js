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

  writeSubtitles (options, index) {
    // console.log('bloc sous titres', options)
    // console.log('index du bloc', index)
    this.actualLength = options.length - 1
    this.globalIndex = index

    // console.log('globalIndex', this.globalIndex)
    map(options, this.write.bind(this, index))
  }

  write (indexOfGlobalSub, opt, index) {
    // console.log('ligne du bloc', opt)
    // console.log('index de la ligne', index)
    // console.log('index du bloc', indexOfGlobalSub)
    delay(this.writeOne.bind(this), opt[1], { text: opt[0], index, indexOfGlobalSub })
  }

  writeOne (opt) {
    console.log('context writeOne', this)
    console.log('opt', opt)
    console.log('globalIndex', this.globalIndex)

    // vérification qu'il s'agit toujours du même bloc de sous-titres sinon return
    if (opt.indexOfGlobalSub !== this.globalIndex) return
    document.querySelector('.subtitles-content').innerHTML = opt.text
    if (opt.index === this.actualLength) delay(this.remove, 2000)
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
    // console.log('sous titres', store.subtitles.get()[0])
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
