/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */
import { DomComponent } from 'abstractions/DomComponent'
import { h, addRef } from '@internet/dom'
import store from 'state/store'
import RichelieuGame from 'components/pixi/PixiGame/RichelieuGame'
import MariecurieGame from 'components/pixi/PixiGame/MariecurieGame'
import NapoleonbonaparteGame from 'components/pixi/PixiGame/NapoleonbonaparteGame'
import RobertdesorbonGame from 'components/pixi/PixiGame/RobertdesorbonGame'
import JacqueslemercierGame from 'components/pixi/PixiGame/JacqueslemercierGame'
import Intro from 'components/dom/Intro/Intro'
import TextScrolling from './TextScrolling'
import anime from 'animejs'

import './Carrousel.styl'

console.log(store.baseUrl.get())

class Form extends DomComponent {
  template (props) {
    let clasName = 'carrousel__form__content ' + props.active
    const loc = store.loc.get()
    this.id = props.id

    return (
      <div class={clasName} launchGame={props.launchGame} type={props.type} data-id={props.id}>
        <div class='carrousel__form'>
          <Story id={props.id} type={props.type} />
          <TextScrolling text={loc['carrousel.' + props.type]} />
          {/* <div className='carrousel__textScrolling' data-text={loc['carrousel.' + props.type]} /> */}
        </div>
        <TextScrolling text={loc['carrousel.' + props.type]} />
        {/* <div className='carrousel__textScrolling' data-text={loc['carrousel.' + props.type]} /> */}
      </div>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  fadeOut (el) {
	  el.classList.add('opacity')
	  setTimeout(function () {
      el.classList.add('hidden')
    }, 2000)
  }

  onClick (e) {
	  this.fadeOut(e.target.parentNode.parentNode)
    this.props.launchGame && this.props.launchGame(this.id)
  }
}

class Story extends DomComponent {
  template (props) {
    const loc = store.loc.get()
    let idIncrement = props.id + 1
    return (
      <div class='carrousel__story' data-id={props.id}><span>{loc['carrousel.story']} <span class='carrousel__story__number'>{idIncrement}</span></span></div>
    )
  }
}

let ticking = false

export default class Carrousel extends DomComponent {
  template ({ base }) {
    this.launchGame = this.fastbind('launchGame', 1)

    return (
      <section data-type='carrousel' id='carrousel' class='carrousel mouse__close' ref={addRef(this, 'carrousel')}>
        {/* <Intro onComplete={this.fastbind('activeCarousel')} ref={addRef(this, 'intro')} /> */}
        <div class='carrousel-wrapper' ref={addRef(this, 'carouselWrapper')}>
          <Form active={'active'} type={'richelieu'} id={0} launchGame={this.launchGame} />
          <Form active={''} type={'mariecurie'} id={1} launchGame={this.launchGame} />
          <Form active={''} type={'robertdesorbon'} id={2} launchGame={this.launchGame} />
          <Form active={''} type={'jacqueslemercier'} id={3} launchGame={this.launchGame} />
          <Form active={''} type={'napoleonbonaparte'} id={4} launchGame={this.launchGame} />
        </div>
      </section>
    )
  }

  componentDidMount () {
    this.mouseWhellTodo = this.fastbind('mouseWhellTodo', 1)
    if (store.skipCarousel.get()) this.launchGame(0)

    this.activeCarousel() // TO REMOVE
  }

  activeCarousel () {
    // anime({
    //   targets: this.intro.base,
    //   opacity: 0,
    //   duration: 600,
    //   easing: 'easeOutQuad',
    //   complete: () => { this.intro.base.classList.add('hidden') }
    // })
    anime({
      targets: this.carouselWrapper,
      opacity: 1,
      duration: 600,
      delay: 800,
      easing: 'easeOutQuad',
      complete: () => { this.carouselWrapper.classList.add('visible') }
    })

    this.bind()
  }

  bind () {
	  document.addEventListener('mousewheel', this.mouseWhellTodo)
  }

  unbind () {
    document.removeEventListener('mousewheel', this.mouseWhellTodo)
  }

  mouseWhellTodo (e) {
    console.log('weel')
	  let lastPostitionScroll = e.deltaY
	  if (!ticking) {
		  this.scrolling(lastPostitionScroll)
		  ticking = true
		  setTimeout(function () {
			  console.log('ticking')
			  ticking = false
		  }, 2000)
	  }
  }

  goNext () {
    let current = document.querySelector('.carrousel__form__content.active')
    let all = document.querySelectorAll('.carrousel__form__content')
    let currentPos = current.getAttribute('data-id')
    let maxPos = all.length
    let nextpos
    let newCurrent
    if (parseInt(currentPos) + 1 > (maxPos - 1)) {
      nextpos = 0
    } else {
      nextpos = parseInt(currentPos) + 1
    }

    let scrollingText = document.querySelectorAll('.carrousel__textScrolling')

    for (let i = 0; i < scrollingText.length; i++) {
      scrollingText[i].classList.add('hidden')
      scrollingText[i].classList.remove('opacity')
    }

    for (let i = 0; i < maxPos; i++) {
      if (parseInt(all[i].getAttribute('data-id')) === nextpos) {
        newCurrent = all[i]
      }
    }

    setTimeout(function () {
      current.classList.remove('active')
      newCurrent.classList.add('active')
      setTimeout(function () {
        for (let i = 0; i < scrollingText.length; i++) {
          scrollingText[i].classList.add('opacity')
          scrollingText[i].classList.remove('hidden')
        }
      }, 1000)
    }, 1000)
  }

  goPrev () {
    let current = document.querySelector('.carrousel__form__content.active')
    let all = document.querySelectorAll('.carrousel__form__content')
    let currentPos = current.getAttribute('data-id')
    let maxPos = all.length
    let nextpos
    let newCurrent

    let scrollingText = document.querySelectorAll('.carrousel__textScrolling')

    for (let i = 0; i < scrollingText.length; i++) {
      scrollingText[i].classList.add('hidden')
      scrollingText[i].classList.remove('opacity')
    }

    if (parseInt(currentPos) - 1 < 0) {
      nextpos = (maxPos - 1)
    } else {
      nextpos = parseInt(currentPos) - 1
    }

    for (let i = 0; i < maxPos; i++) {
      if (parseInt(all[i].getAttribute('data-id')) === nextpos) {
        newCurrent = all[i]
      }
    }

    setTimeout(function () {
      current.classList.remove('active')
      newCurrent.classList.add('active')
      setTimeout(function () {
        for (let i = 0; i < scrollingText.length; i++) {
          scrollingText[i].classList.add('opacity')
          scrollingText[i].classList.remove('hidden')
        }
      }, 1000)
    }, 1000)
  }

  scrolling (posScroll) {
    if (posScroll > 0) {
      this.goPrev()
    } else {
      this.goNext()
    }
  }

  launchGame (id) {
    this.unbind()
    this.carrousel.classList.add('hidden')
    id = 0 // to force Ricelieu story

    switch (id) {
      case 0:
        this.game = new RichelieuGame({ autosetup: true })
        break
      case 1:
        this.game = new MariecurieGame({ autosetup: true })
        break
      case 2:
        this.game = new RobertdesorbonGame({ autosetup: true })
        break
      case 3:
        this.game = new JacqueslemercierGame({ autosetup: true })
        break
      case 4:
        this.game = new NapoleonbonaparteGame({ autosetup: true })
        break
      default:
        console.log('error')
    }
    store.currentHistory.set(id)
    store.launched.set(true)
  }
}
