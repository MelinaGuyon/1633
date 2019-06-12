import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'

import './About.styl'


// class Fact extends DomComponent {
//   template (props) {
//     return (
//       <div class=''>
//       </div>
//     )
//   }

//   componentDidMount () {
//   }
// }

export default class About extends DomComponent {
  template ({ base }) {
    return (
      <section id='about' ref={addRef(this, 'about')}>
        <div class='content'>
          <p class='title'>Gobelins x Sorbonne</p>
          <p class='description'>1253 : Il était une fois la Sorbonne est un projet imaginé et créé en partenariat avec la Chancellerie de Paris par des étudiantes en Master Design et Management de l’Innovation Interactive à Gobelins, l’Ecole de l’Image.</p>
          <p class='helpers'>Avec l’aimable participation de : Mélody Laurent, Frédérick Bigrat, Alex Thao, Sarah Ziade, Rachel Donnat, Pauline Gomy, Arnaud Lacaze, Jean-Christophe Lebert, Mathieu Mauclerc, François Puissant</p>
          <ul class='team'>
            <li>
              <p class='name'>Alicia Baudry</p>
              <p class='job'>Développeuse</p>
            </li>
            <li>
              <p class='name'>Hélène Starck</p>
              <p class='job'>Illustratrice</p>
            </li>
            <li>
              <p class='name'>Mélina Guyon</p>
              <p class='job'>Développeuse</p>
            </li>
            <li>
              <p class='name'>Tatiana Jacques</p>
              <p class='job'>Développeuse</p>
            </li>
            <li>
              <p class='name'>Solenne Relisieux</p>
              <p class='job'>Designer</p>
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
      store.pause.set(true)
      store.menuLight.set(true)
      store.menuSocials.set(false)
    } else if (aboutStatus === 'disappearing') {
      this.about.classList.remove('visible')
      store.pause.set(false)
      store.menuLight.set(false)
      store.menuSocials.set(true)
    }
  }
}
