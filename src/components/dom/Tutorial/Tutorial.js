/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */
import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import cookie from 'controllers/cookie'
import logger from 'utils/logger'
import signals from 'state/signals'
import anime from 'animejs'

import './Tutorial.styl'

class TutoKeyboard extends DomComponent {
  template (props) {
	  const loc = store.loc.get()
	  return (
      <div class='tutorial__item' data-tuto='keyboard'>
        <div class='mouse__close-zone tutorial__center'>
          <div className='tutorial__pictos'>
            <img src={'assets/img/pictos/arrow-left.svg'} alt='' />
            <img src={'assets/img/pictos/arrow-right.svg'} alt='' />
          </div>
          <p>{loc['tuto.keyboard']}</p>
        </div>
      </div>
    )
  }

  componentDidMount () {
	  this.keydown = this.fastbind('keydown', 1)
  }

  activate () {
    this.base.classList.add('active')
    this.bind()
  }

  bind () {
    signals.goLeft.listen(this.keydown)
    signals.goRight.listen(this.keydown)
  }

  keydown (key) {
    anime({
      targets: this.base,
      opacity: 0,
      duration: 600,
      easing: 'easeOutQuad',
      complete: () => {
        this.base.classList.remove('active')
      }
    })
    this.removeListener()
    store.pause.set(false)
  }

  removeListener () {
	  signals.goLeft.unlisten(this.keydown)
	  signals.goRight.unlisten(this.keydown)
  }
}

// class Button extends DomComponent {
//   template (props) {
//     return (
//       <button class='tutorial__close magnet'>
//         <img src={'assets/img/pictos/close.svg'} alt='' />
//       </button>
//     )
//   }

//   componentDidMount () {
//     this.bind()
//   }

//   bind () {
//     this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
//   }

//   onClick (e) {
// 	  let $parent = e.target.closest('.tutorial__item')
//     $parent.remove()
//     store.pause.set(false)
//   }
// }

class TutoSpace extends DomComponent {
  template (props) {
	  const loc = store.loc.get()
	  return (
      <div class='tutorial__item' data-tuto='space'>
        <div class='tutorial__bkgform'>
          <div class='mouse__close-zone tutorial__center'>
            <p>{loc['tuto.spacebar']}</p>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
	  this.keydown = this.fastbind('keydown', 1)
  }

  activate () {
    this.base.classList.add('active')
    this.bind()
  }

  bind () {
    signals.space.listen(this.keydown)
  }

  keydown () {
    anime({
      targets: this.base,
      opacity: 0,
      duration: 600,
      easing: 'easeOutQuad',
      complete: () => {
        this.base.classList.remove('active')
      }
    })
    this.removeListener()
    store.pause.set(false)
  }

  removeListener () {
	  signals.goLeft.unlisten(this.keydown)
	  signals.goRight.unlisten(this.keydown)
  }
}

export default class Tutorial extends DomComponent {
  template ({ base }) {
    return (
      <section data-type='tutorial' class='tutorial mouse__close'>
        <div class=''>
          <TutoKeyboard ref={addRef(this, 'keyboard')} />
          <TutoSpace ref={addRef(this, 'space')} />
        </div>
      </section>
    )
  }

  componentDidMount () {
	  this.keydown = this.fastbind('keydown', 1)
    let isAlreadyShow
	  isAlreadyShow = cookie.readCookie('tuto')
    if (isAlreadyShow) {
	    document.querySelector('.tutorial').remove()
    }
	  signals.newDom.dispatch()
    logger('Tutorial did mount', '#47b342').log()

    this.bind()
  }

  bind () {
    signals.activeTuto.listen(this.fastbind('activeTudo', 1))
  }

  activeTudo (tuto) {
    this[tuto].activate()
  }
}
