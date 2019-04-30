import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'

import './Timeline.styl'


export default class Timeline extends DomComponent {
  template ({ base }) {
    return (
      <section class='timeline'>
        <h1>Chronologie</h1>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </section>
    )
  }

  componentDidMount () {
  }
}
