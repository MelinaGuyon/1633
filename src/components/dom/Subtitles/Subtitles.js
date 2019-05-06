import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import anime from 'animejs'
import { map, delay } from 'lodash'

import subtitles from './datas.js'
import './Subtitles.styl'


class SubtitlesContent extends DomComponent {
  template (props) {
    const loc = store.loc.get()

    return (
      <div class='subtitles-content' data-id={props.id}>{loc['nav.' + props.type]}</div>
    )
  }

  componentDidMount () {
    console.log("datas", subtitles)
/*    this.writeSubtitles(subtitles[index], index)
*/  }
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

  writeSubtitles (options, index) {
    let actualLength = options.length - 1
    let globalIndex = index
    map(options, this.write(index))
  }

  write (indexOfGlobalSub, opt, index) {
    delay(this.writeOne, opt[1], { text: opt[0], index, indexOfGlobalSub });
  }

  writeOne (opt) {
    if (opt.indexOfGlobalSub !== globalIndex) return
    document.querySelector('.subtitles-content').innerHTML = opt.text
    if (opt.index === actualLength) delay(this.remove, 2000);
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
}