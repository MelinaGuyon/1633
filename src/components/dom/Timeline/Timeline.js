import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'

import './Timeline.styl'

class Point extends DomComponent {
  template (props) {
    const loc = store.loc.get()

    return (
      <button class='chapter' data-id={props.id} />
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
    if (store.chronologieStatus.get() === 'appearing' && store.chapterId.get(id) !== id) {
      document.querySelector('#chronologie').scrollTo(0, document.querySelector('#fact' + id + '').offsetTop)
    } else {
      if (store.chronologieStatus.get() !== 'appearing') {
        store.chronologieStatus.set('appearing')
      } else {
        store.chronologieStatus.set('disappearing')
      }
    }
    store.chapterId.set(id)
  }
}

export default class Timeline extends DomComponent {
  template ({ base }) {
    return (
      <section class='timeline'>
        <Point type={'university'} id={0} />
        <Point type={'university'} id={1} />
        <Point type={'university'} id={2} />
        <Point type={'university'} id={3} />
        <Point type={'university'} id={4} />
        <Point type={'university'} id={5} />
      </section>
    )
  }

  componentDidMount () {
  }
}
