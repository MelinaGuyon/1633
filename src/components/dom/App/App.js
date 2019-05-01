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
        base={this.base.querySelector('.prld')}
        onComplete={this.fastbind('didPreload')}
      />)
  }

  didPreload () {
    Promise.resolve()
      .then(() => {
        // Render the Game Interface
        this.render(<GameInterface />, this.base)
      })
  }
}
