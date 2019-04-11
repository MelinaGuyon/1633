import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'

import './Menu.styl'

export default class GameInterface extends DomComponent {
  template ({ base }) {
    const loc = store.loc.get()
    console.log(loc)

    return (
      <section class='menu'>
        <button class='nav' data-nav='university'>{loc['nav.university']}</button>
        <button class='nav' data-nav='church'>{loc['nav.church']}</button>
        <button class='nav' data-nav='profanation'>{loc['nav.profanation']}</button>
      </section>
    )
  }

  componentDidMount () {

  }
}
