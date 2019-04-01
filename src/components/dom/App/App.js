import './App.styl'

import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
// import pixi from 'controllers/pixi'

import Preloader from 'components/dom/Preloader/Preloader'
// import Game from 'components/dom/Game/Game'

export default class App extends DomComponent {
  template ({ base }) {
    return base
  }

  componentDidMount () {
    // Initialize pixi part of the App
    // pixi.init()

    // Render the pixi canvas in App <main> node
    // this.render(pixi.getView(), this.base)

    // Attach Preloader component
    this.render(
      <Preloader
        ref={addRef(this, 'preloader')}
        base={this.base.querySelector('.prld')}
        onComplete={this.fastbind('didPreload')}
      />)
  }

  // Once preloading is done
  didPreload () {
    console.log('Lauch game')
    // Promise.resolve()
    //   .then(() => this.render(<Game />, this.base))
  }
}
