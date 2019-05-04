import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import anime from 'animejs'
import { map, delay } from 'lodash'

import './Subtitles.styl'

class SubtitlesContent extends DomComponent {
  template (props) {
    const loc = store.loc.get()

    return (
      <div class='subtitles-content' data-id={props.id}>{loc['nav.' + props.type]}</div>
    )
  }

  writeSubtitles (options, index) {
    console.log('bloc sous titres', options)
    console.log('index du bloc', index)
    let actualLength = options.length - 1
    let globalIndex = index
    map(options, this.write.bind(index))
  }

  write (opt, index, indexOfGlobalSub) {
    // opt = ligne de options
    // index index de la ligne
    // globalIndex index du bloc de subtitles
    console.log('ligne du bloc', opt)
    console.log('index de la ligne', index)
    console.log('index du bloc', indexOfGlobalSub)
    delay(this.writeOne, opt[1], { text: opt[0], index, indexOfGlobalSub })
  }

  writeOne (opt) {
    // vérification qu'il s'agit toujours du même bloc de sous-titres sinon return
    if (opt.indexOfGlobalSub !== globalIndex) return
    document.querySelector('.subtitles-content').innerHTML = opt.text
    if (opt.index === actualLength) delay(this.remove, 2000)
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
    this.writeSubtitles(store.subtitles.get()[0], 0)
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
