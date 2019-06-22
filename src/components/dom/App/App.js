import './App.styl'

import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import pixi from 'controllers/pixi'
import mouse from 'controllers/mouse'

import Preloader from 'components/dom/Preloader/Preloader'
import MouseMv from 'components/dom/MouseMv/MouseMv'
import Indications from 'components/dom/Indications/Indications'
import GameInterface from 'components/dom/GameInterface/GameInterface'
import signals from 'state/signals'

export default class App extends DomComponent {
  template ({ base }) {
    return base
  }

  componentDidMount () {
    this.bind()
    pixi.init()

    this.render(pixi.getView(), this.base)
    this.render(
      <Preloader
        ref={addRef(this, 'preloader')}
        onComplete={this.fastbind('didPreload')}
      />, this.base)
    this.render(
      <MouseMv
        ref={addRef(this, 'mouse')}
      />, this.base)
    this.render(
      <Indications
        ref={addRef(this, 'indications')}
      />, this.base)

    mouse.init(document.getElementsByClassName('game'))
  }

  bind () {
    signals.moreNoise.listen(this.updateNoise)
  }

  unbind () {
    signals.moreNoise.unlisten(this.updateNoise)
  }

  updateNoise (moreNoise) {
    if (moreNoise) document.body.classList.add('more-noise')
    else document.body.classList.remove('more-noise')
  }

  didPreload () {
    Promise.resolve()
      .then(() => {
        // Render the Game Interface
        // TODO COOKIE
        this.render(<GameInterface />, this.base)
      })
  }
}
