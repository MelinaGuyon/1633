import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import anime from 'animejs'

import './Chronologie.styl'

class NextButton extends DomComponent {
  template (props) {
    const loc = store.loc.get()

    return (
      <button class="nextFact" data-id={props.id}>Fait suivant</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1))
  }

  onClick (e) {
    let nextFactId = Number(e.target.getAttribute('data-id')) + 1
    document.querySelector(".chronologie").scrollTo(0, document.querySelector("#fact"+nextFactId+"").offsetTop)
  }
}

class Fact extends DomComponent {
  template (props) {
    const loc = store.loc.get()
    this.factsStatus = ['locked', 'locked', 'locked', 'locked', 'locked']

    return (
      <div class='fact' id={props.type} data-id={props.id}>
        <img class="character" data-id={props.id} src="http://www.europexplo.fr/wp-content/uploads/2016/08/MAZARIN.png" />
        <div class="factContent" data-id={props.id}>{loc['fact.' + props.type]}</div>
        <NextButton id={props.id}/>
      </div>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.listenStore('chronologieStatus', this.onChronologieClick)
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
    this.base.addEventListener('mousemove', this.fastbind('onMouseMove', 1))
  }

  onChronologieClick (chronologieStatus) {
    if (chronologieStatus === 'appearing') {
      anime({
        targets: document.querySelector('.chronologie'),
        translateX: -window.innerWidth,
        easing: 'easeOutQuad',
        duration: 600
      })
    } else if (chronologieStatus === 'disappearing') {
      anime({
        targets: document.querySelector('.chronologie'),
        translateX: '0px',
        easing: 'easeOutQuad',
        duration: 600
      })
    }
  }

  onClick (e) {
    let id = Number(e.target.getAttribute('data-id'))
    console.log('deblocage fact', id, store.factsStatus.get()[id])
    store.factsStatus.current[id] = 'unlocked'
    document.querySelector('#fact' + id + ' .factContent').style.opacity = 0.5
  }

  onMouseMove (e) {
    let id = Number(e.target.getAttribute('data-id'))
    let container = document.querySelector("#fact"+id+"")
    let character = document.querySelector("#fact"+id+" .character")
    this.parallaxIt(e, container, character, -70)
  }

  parallaxIt (e, container, target, movement) {
    let relX = e.pageX - container.offsetLeft
    let relY = e.pageY // - container.offsetTop

    anime({
      targets: target,
      translateX: (relX - container.offsetWidth / 2) / container.offsetWidth * movement,
      translateY: (relY - container.offsetHeight / 2) / container.offsetHeight * movement,
      easing: 'easeOutQuad'
    })
  }
}

export default class Chronologie extends DomComponent {
  template ({ base }) {
    return (
      <section class='chronologie'>
        <Fact type={'fact0'} id={0} />
        <Fact type={'fact1'} id={1} />
        <Fact type={'fact2'} id={2} />
        <Fact type={'fact3'} id={3} />
        <Fact type={'fact4'} id={4} />
      </section>
    )
  }

  componentDidMount () {
  }
}
