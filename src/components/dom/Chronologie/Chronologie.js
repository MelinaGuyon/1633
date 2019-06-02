import { h, addRef } from '@internet/dom'
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
      <div class='fact' id={props.type} data-id={props.id} ref={addRef(this, 'fact')}>
        <img class='character' ref={addRef(this, 'character')} data-id={props.id} src='http://www.europexplo.fr/wp-content/uploads/2016/08/MAZARIN.png' />
        <div class='factContent' data-id={props.id}>{loc['chronologie.fact'] + (props.id + 1)}</div>
      </div>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    // TODO : écouter le mouse store car sinon il y en aura des dizaines + mettre les glass
    this.base.addEventListener('mousemove', this.fastbind('onMouseMove', 1))
  }

  onMouseMove (e) {
    let container = this.fact
    let character = this.character
    this.parallaxIt(e, container, character, -70)
  }

  parallaxIt (e, container, target, movement) {
    let relX = e.pageX - container.offsetLeft
    let relY = e.pageY

    // TODO : pas animejs mais inrtia
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
    // Faire différents tableau de facts / de ref de facts, et pointer dans le bon
    this.number = 11
    this.facts = Array(this.number)

    const facts = []
    const refFacts = i => el => {
      this.facts[i] = el
    }
    for (let i = 0; i < this.number; i++) {
      facts.push(<Fact ref={refFacts(i)} id={i} />)
    }

    return (
      <section id='chronologie' ref={addRef(this, 'chronologie')}>
        {facts}
      </section>
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    // this.listenStore('factsStatus', this.onFactUnlocked)
    this.listenStore('chronologieStatus', this.onChronologieClick)
  }

  // onFactUnlocked (id) {
  //   console.log('FACT UNLOCKED', id)
  //   console.log('factsStatus updated', store.factsStatus.get())
  // }

  onChronologieClick (chronologieStatus) {
    if (chronologieStatus === 'appearing') {
      this.chronologie.scrollTop = this.facts[store.chronologieId.get()].base.offsetTop
      this.chronologie.classList.add('visible')
    } else if (chronologieStatus === 'disappearing') {
      this.chronologie.classList.remove('visible')
    }
  }
}
