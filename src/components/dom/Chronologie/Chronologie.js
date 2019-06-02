import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import anime from 'animejs'

import './Chronologie.styl'


class PreviousButton extends DomComponent {
  template (props) {
    return (
      <button class='buttonFact' data-id={props.id}>Fait précédent</button>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1))
  }

  onClick (e) {
    let previousFactId = Number(e.target.getAttribute('data-id')) - 1
    if (previousFactId >= 0) document.querySelector('#chronologie').scrollTo(0, document.querySelector('#fact' + previousFactId + '').offsetTop)
  }
}

class NextButton extends DomComponent {
  template (props) {
    return (
      <button class='buttonFact' data-id={props.id}>Fait suivant</button>
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
    if (nextFactId < store.factsStatus.get().length) document.querySelector('#chronologie').scrollTo(0, document.querySelector('#fact' + nextFactId + '').offsetTop)
  }
}

class Fact extends DomComponent {
  template (props) {
    const loc = store.loc.get()

    return (
      <div class='fact' id={props.type} data-id={props.id}>
        <img class='character' data-id={props.id} src='http://www.europexplo.fr/wp-content/uploads/2016/08/MAZARIN.png' />
        <div class='factContent' data-id={props.id}>{loc['chronologie.fact'] + (props.id + 1)}</div>
      </div>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    // this.listenStore('factsStatus', this.onFactUnlocked)
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event

    // TODO : écouter le mouse store + mettre les glass
    this.base.addEventListener('mousemove', this.fastbind('onMouseMove', 1))
  }

  // onClick (e) {
  //  let id = Number(e.target.getAttribute('data-id'))
  //  store.factsStatus.current[id] = 'unlocked'
  //  document.querySelector('#fact' + id + ' .factContent').style.opacity = 0.5
  // }

  // onFactUnlocked (id) {
  //   console.log('FACT UNLOCKED', id)
  //   console.log('factsStatus updated', store.factsStatus.get())
  // }

  onMouseMove (e) {
    let id = Number(e.target.getAttribute('data-id'))
    let container = document.querySelector('#fact' + id + '')
    let character = document.querySelector('#fact' + id + ' .character')
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
    // TODO :: Need to be dynamic with ALL interest of ALL Sorbonne
    return (
      <section id='chronologie'>
        <Fact type={'fact0'} id={0} />
        <Fact type={'fact1'} id={1} />
        <Fact type={'fact2'} id={2} />
        <Fact type={'fact3'} id={3} />
        <Fact type={'fact4'} id={4} />
        <Fact type={'fact5'} id={5} />
        <Fact type={'fact6'} id={6} />
        <Fact type={'fact7'} id={7} />
        <Fact type={'fact8'} id={8} />
        <Fact type={'fact9'} id={9} />
        <Fact type={'fact10'} id={10} />
      </section>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.listenStore('chronologieStatus', this.onChronologieClick)
  }

  onChronologieClick (chronologieStatus) {
    if (chronologieStatus === 'appearing') {
      document.querySelector('#chronologie').className = 'visible'
      // TODO :: not working
      // setTimeout(function () { document.querySelector('#chronologie').scrollTo(0, document.querySelector('#fact' + store.chapterId.get() + '').offsetTop) }, 1000)
    } else if (chronologieStatus === 'disappearing') {
      document.querySelector('#chronologie').className = 'hidden'
    }
  }
}
