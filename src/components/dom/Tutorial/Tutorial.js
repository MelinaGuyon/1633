import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import MouseMv from 'components/dom/MouseMv/MouseMv'

import './Tutorial.styl'

export default class Tutorial extends DomComponent {
  template ({ base }) {
    return (
      <section class='tutorial'>
        Tuto
      </section>
    )
  }

  componentDidMount () {
    console.log('Tutorial did mount')
  }
}
