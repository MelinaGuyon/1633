/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */
import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import cookie from 'controllers/cookie'
import logger from 'utils/logger'
import signals from 'state/signals'

import './Tutorial.styl'

class TutoKeyboard extends DomComponent {
  template (props) {
	  const loc = store.loc.get()
	  return (
      <div class='tutorial__item' data-tuto='keyboard'>
    <div class='mouse__close-zone tutorial__center'>
          <Button class='tutorial__close ' />
          <div className='tutorial__pictos'>
        <img src={'assets/img/pictos/arrow-left.svg'} alt='' />
        <img src={'assets/img/pictos/arrow-right.svg'} alt='' />
      </div>
          <p>{loc['tuto.keyboard']}</p>
        </div>
  </div>
    )
  }
}

class Button extends DomComponent {
  template (props) {
    return (
      <button class='tutorial__close magnet'>
        <img src={'assets/img/pictos/close.svg'} alt='' />
      </button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
	  let $parent = e.target.closest('.tutorial__item')
    $parent.remove()
    store.pause.set(false)
  }
}

class TutoSpace extends DomComponent {
  template (props) {
	  const loc = store.loc.get()
	  return (
      <div class='tutorial__item' data-tuto='space'>
    <div class='tutorial__bkgform'>
          <div class='mouse__close-zone tutorial__center'>
        <Button class='tutorial__close'>x</Button>
        <p>{loc['tuto.spacebar']}</p>
      </div>
        </div>
  </div>
    )
  }
}

export default class Tutorial extends DomComponent {
  template ({ base }) {
    return (
      <section data-type='tutorial' class='tutorial mouse__close'>
        <div class=''>
          <TutoKeyboard />
          <TutoSpace />
        </div>
      </section>
    )
  }

  componentDidMount () {
	  this.keyup = this.fastbind('keyup', 1)
    let isAlreadyShow
	  isAlreadyShow = cookie.readCookie('tuto')
    if (isAlreadyShow) {
	    document.querySelector('.tutorial').remove()
    }
	  signals.newDom.dispatch()
	  logger('Tutorial did mount', '#47b342').log()
	  // signals.goLeft.listen(this.keyup) TODO
	  // signals.goRight.listen(this.keyup) TODO
  }

  keyup () {
    console.log('close')
    let tutoOpen = document.querySelector('.tutorial__item.active')
    console.log(tutoOpen)
    if (tutoOpen !== null) {
      tutoOpen.remove()
      this.removeListener()
    }
  }

  removeListener () {
	  signals.goLeft.unlisten(this.keyup)
	  signals.goRight.unlisten(this.keyup)
  }
}
