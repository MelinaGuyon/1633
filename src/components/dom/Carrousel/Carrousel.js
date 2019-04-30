import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'

import './Carrousel.styl'

class Button extends DomComponent {
  template (props) {
    const loc = store.loc.get()
    console.log('carrousel.' + props.type)
    return (
      <button class='carrousel__choice' data-id={props.id}>{loc['carrousel.' + props.type]}</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
    //const id = Number(e.target.getAttribute('data-id'))
    //store.levelId.set(id)
    e.target.parentNode.classList.add('hidden')
  }
}

export default class Carrousel extends DomComponent {
  template ({ base }) {
    return (
      <section class='carrousel'>
		    <Button type={'richelieu'} id={0} />
		    <Button type={'mariecurie'} id={1} />
		    <Button type={'robertdesorbon'} id={2} />
		    <Button type={'jacqueslemercier'} id={3} />
		    <Button type={'napoleonbonaparte'} id={4} />
      </section>
    )
  }

  componentDidMount () {
  }
}
