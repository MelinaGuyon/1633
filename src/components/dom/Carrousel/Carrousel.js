/* eslint-disable no-mixed-spaces-and-tabs,no-tabs,no-tabs */
import { DomComponent } from 'abstractions/DomComponent'
import { h, addRef } from '@internet/dom'
import store from 'state/store'
import signals from 'state/signals'
import RichelieuGame from 'components/pixi/PixiGame/RichelieuGame'
import MariecurieGame from 'components/pixi/PixiGame/MariecurieGame'
import NapoleonbonaparteGame from 'components/pixi/PixiGame/NapoleonbonaparteGame'
import RobertdesorbonGame from 'components/pixi/PixiGame/RobertdesorbonGame'
import JacqueslemercierGame from 'components/pixi/PixiGame/JacqueslemercierGame'
import Intro from 'components/dom/Intro/Intro'
import IntroCinematic from 'components/dom/IntroCinematic/IntroCinematic'
import TextScrolling from './TextScrolling'
import anime from 'animejs'
import delay from 'lodash/delay'

import './Carrousel.styl'

class Form extends DomComponent {
  template (props) {
    let clasName = 'carrousel__form__content ' + props.active + props.animated
    const loc = store.loc.get()
    this.id = props.id

    return (
      <div class={clasName} launchGame={props.launchGame} type={props.type} data-id={props.id}>
        <div class='carrousel__form' ref={addRef(this, 'form')}>
          <TextScrolling text={loc['carrousel.' + props.type]} ref={addRef(this, 'text')} />
        </div>
        <TextScrolling text={loc['carrousel.' + props.type]} stroke ref={addRef(this, 'text2')} />
      </div>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  unbind () {
    this.base.removeEventListener('click', this.onClick) // 1 to pass the event
  }

  fadeOut (el) {
    this.base.classList.add('full')
	  setTimeout(function () {
      el.classList.remove('animated')
      el.classList.add('hidden')
    }, 2000)
  }

  onClick (e) {
    this.unbind()
    this.fadeOut(e.target.parentNode.parentNode)
    this.props.launchGame && this.props.launchGame({ id: this.id })
  }
}

class Background extends DomComponent {
  template (props) {
    const loc = store.loc.get()
    return (
      <div class='carrousel__background'>
        <img class='img' src='assets/img/backgound/form.png' />
        <div class='story'>
          <span>{loc['carrousel.story']}</span>
          <span class='number' ref={addRef(this, 'number')}>01</span>
        </div>
      </div>
    )
  }

  animeNumber (number) {
    let num = number + 1
    console.log(this.number)
    anime({
      targets: this.number,
      opacity: 0,
      translateY: [0, 20],
      duration: 300,
      easing: 'easeOutQuad',
      complete: () => {
        this.number.innerText = '0' + num
        anime({
          targets: this.number,
          opacity: 1,
          duration: 300,
          translateY: [-20, 0],
          easing: 'easeOutQuad'
        })
      }
    })
  }
}

let ticking = false

export default class Carrousel extends DomComponent {
  template ({ base }) {
    this.launchGame = this.fastbind('launchGame', 1)

    return (
      <section data-type='carrousel' id='carrousel' class='carrousel mouse__close' ref={addRef(this, 'carrousel')}>
        <Intro onComplete={this.fastbind('activeCarousel')} ref={addRef(this, 'intro')} />
        <IntroCinematic ref={addRef(this, 'cinematic')} />
        <div class='carrousel-wrapper' ref={addRef(this, 'carouselWrapper')}>
          <Background ref={addRef(this, 'background')}/>
          <Form active={'active '} animated={'animated'} type={'richelieu'} id={0} launchGame={this.launchGame} />
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
    if (store.skipCarousel.get()) this.directLaunch()
  }

  activeCarousel () {
    anime({
      targets: this.intro.base,
      opacity: 0,
      duration: 600,
      easing: 'easeOutQuad',
      complete: () => { this.intro.base.classList.add('hidden') }
    })
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
	  let lastPostitionScroll = e.deltaY
	  if (!ticking) {
		  this.scrolling(lastPostitionScroll)
		  ticking = true
		  setTimeout(function () {
			  console.log('ticking')
			  ticking = false
		  }, 1500)
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

    for (let i = 0; i < maxPos; i++) {
      if (parseInt(all[i].getAttribute('data-id')) === nextpos) {
        newCurrent = all[i]
      }
    }

    this.background.animeNumber(nextpos)
    current.classList.remove('active')
    delay(() => {
      current.classList.remove('animated')
      newCurrent.classList.add('active', 'animated')
    }, 600)
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

    this.background.animeNumber(nextpos)
    current.classList.remove('active')
    delay(() => {
      current.classList.remove('animated')
      newCurrent.classList.add('active', 'animated')
    }, 600)
  }

  scrolling (posScroll) {
    if (posScroll > 0) {
      this.goNext()
    } else {
      this.goPrev()
    }
  }

  launchGame (obj) {
    this.unbind()
    obj.id = 0 // to force Ricelieu story

    this.carrousel.classList.add('no-touch')

    anime({
      targets: this.carouselWrapper,
      opacity: 0,
      duration: 300,
      delay: 400,
      easing: 'easeInOutQuad',
      complete: () => {
        this.cinematic.start().then(() => {
          this.launchPixi(obj)
        })
      }
    })
  }

  launchPixi (obj) {
    switch (obj.id) {
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
    store.currentHistory.set(obj.id)
    store.launched.set(true)
    anime({
      targets: this.carrousel,
      opacity: 0,
      duration: 600,
      delay: 1500,
      easing: 'easeOutQuad',
      complete: () => {
        this.carrousel.classList.add('hidden')
        if (!store.skipTuto.get()) {
          store.pause.set(true)
          signals.activeTuto.dispatch('keyboard')
        }
      }
    })
  }

  directLaunch () {
    this.unbind()
    this.game = new RichelieuGame({ autosetup: true })
    this.carrousel.classList.add('hidden')
    store.currentHistory.set(0)
    store.launched.set(true)
  }
}
