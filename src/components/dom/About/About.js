import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'

import './About.styl'

export default class About extends DomComponent {
  template ({ base }) {
    const loc = store.loc.get()

    return (
      <section id='about' ref={addRef(this, 'about')}>
        <div class='content'>
          <p class='title'>Gobelins <span class='love'>x</span> Sorbonne</p>
          <p class='description'>{loc['about.description']}</p>
          <p class='helpers'>{loc['about.helpers']}</p>
          <ul class='team'>
            <li>
              <p class='name'>Alicia Baudry</p>
              <p class='job'>{loc['about.developer']}</p>
            </li>
            <li>
              <p class='name'>Hélène Starck</p>
              <p class='job'>{loc['about.illustrator']}</p>
            </li>
            <li>
              <p class='name'>Mélina Guyon</p>
              <p class='job'>{loc['about.developer']}</p>
            </li>
            <li>
              <p class='name'>Tatiana Jacques</p>
              <p class='job'>{loc['about.developer']}</p>
            </li>
            <li>
              <p class='name'>Solenne Relisieux</p>
              <p class='job'>{loc['about.designer']}</p>
            </li>
          </ul>
        </div>
      </section>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.listenStore('aboutStatus', this.onAboutClick)
  }

  onAboutClick (aboutStatus) {
    if (aboutStatus === 'appearing') {
      this.about.classList.add('visible')
      this.stateGamePause = store.pause.get()
      store.pause.set(true)
      store.menuLight.set(true)
      store.menuSocials.set(false)
      store.menuGame.set(false)
    } else if (aboutStatus === 'disappearing') {
      this.about.classList.remove('visible')
      store.pause.set(this.stateGamePause)
      store.menuLight.set(false)
      store.menuSocials.set(true)
      store.menuGame.set(true)
    }
  }
}
