import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'

import './Menu.styl'

class Button extends DomComponent {
  template (props) {
    const loc = store.loc.get()

    console.log("ICI", loc['nav.' + props.type])

    return (
      <button class='nav' data-id={props.id}>{loc['nav.' + props.type]}</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
    const id = Number(e.target.getAttribute('data-id'))
    store.levelId.set(id)
  }
}

class TimelineButton extends DomComponent {
  template (props) {
    const loc = store.loc.get()

    return (
      <button class='nav' data-id={props.id}>{loc['nav.' + props.type]}</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
    if (store.timelineStatus.get() != "appearing") {
      store.timelineStatus.set("appearing")
    }
    else {
      store.timelineStatus.set("disappearing")
    }
  }
}

export default class Menu extends DomComponent {
  template ({ base }) {
    return (
      <section class='menu'>
        <Button type={'university'} id={0} />
        <Button type={'church'} id={1} />
        <Button type={'profanation'} id={2} />
        <TimelineButton type={'timeline'} id={3} />
      </section>
    )
  }

  componentDidMount () {
  }
}
