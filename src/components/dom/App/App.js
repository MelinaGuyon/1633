import './App.styl'

import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import pixi from 'controllers/pixi'

import Preloader from 'components/dom/Preloader/Preloader'
import GameInterface from 'components/dom/GameInterface/GameInterface'

export default class App extends DomComponent {
  template ({ base }) {
    return base
  }

  componentDidMount () {
    pixi.init()

    this.render(pixi.getView(), this.base)
    this.render(
      <Preloader
        ref={addRef(this, 'preloader')}
        onComplete={this.fastbind('didPreload')}
      />, this.base)
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
