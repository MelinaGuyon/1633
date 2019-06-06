import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import Glass from 'components/dom/Glass/Glass'
import store from 'state/store'
import anime from 'animejs'
import signals from 'state/signals'
import sortBy from 'lodash/sortBy'

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
    this.date = props.content.date

    return (
      <div class='fact locked' ref={addRef(this, 'fact')}>
        <div class='content-container'>
          <img class='character' ref={addRef(this, 'character')} src={props.content.img} />
          <div class='content' ref={addRef(this, 'content')} >
            <p class='date'>{props.content.date}</p>
            <p class='title'>{props.content.title}</p>
            <p class='name'>{props.content.historyName}</p>
            <p class='text'>{props.content.text}</p>
          </div>
        </div>

        <h2 class='locked-title'>{props.content.title}</h2>
        <Glass ref={addRef(this, 'glass')} parrent />
      </div>
    )
  }

  componentDidMount () {
    this.initParams()
    this.bind()
  }

  initParams () {
    this.top = this.fact.offsetTop
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
    this.historyNumber = 4 // temp, need to be replace with a real History number getted from store

    // get indexes order according to history played
    this.order = store.chronologie.get().order[store.currentHistory.get()]
    store.chronologieIdsTable.set(this.order)

    // get all datas of the entire chronology
    this.chronologieDatas = store.chronologie.get().chrono
    this.chronologieDatas = sortBy(this.chronologieDatas, [(d) => { return d.date }])
    this.chronologieNumber = this.chronologieDatas.length
    this.facts = Array(this.historyNumber)
    this.factsOrdered = Array(this.chronologieNumber)

    for (let i = 0; i < this.historyNumber; i++) {
      this.facts[i] = []
    }

    const facts = []
    const refFacts = i => el => {
      this.facts[this.chronologieDatas[i].historyId].push(el)
      this.factsOrdered[i] = el
    }

    for (let i = 0; i < this.chronologieNumber; i++) {
      facts.push(<Fact ref={refFacts(i)} id={i} content={this.chronologieDatas[i]} />)
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
    signals.factUnlock.listen(this.fastbind('onFactUnlocked', 1))
    this.listenStore('chronologieStatus', this.onChronologieClick)
  }

  internalBind () {
    window.addEventListener('mousewheel', this.fastbind('getChronologieOffset', 1))
    window.addEventListener('mousewheel', this.fastbind('checkCurrent', 1))
    this.facts.forEach((tab) => {
      tab.forEach((el) => {
        el.glass.bind()
      })
    })
  }

  internalUnbind () {
    window.removeEventListener('mousewheel', this.getChronologieOffset)
    window.removeEventListener('mousewheel', this.checkCurrent)
    this.facts.forEach((tab) => {
      tab.forEach((el) => {
        el.glass.unbind()
      })
    })
  }

  onFactUnlocked (id) {
    this.facts[store.currentHistory.get()][id].base.classList.remove('locked')

    document.querySelector('.message').className = 'message active'
    setTimeout(() => {
      document.querySelector('.message').className = 'message'
    }, 1000)
  }

  onChronologieClick (chronologieStatus, top) {
    if (chronologieStatus === 'appearing') {
      if (store.chronologieId.get() === 'top') this.chronologie.scrollTop = 0
      else this.chronologie.scrollTop = this.facts[store.currentHistory.get()][store.chronologieId.get()].base.offsetTop
      this.chronologie.classList.add('visible')
      this.getChronologieOffset()
      this.checkCurrent()
      this.internalBind()
      this.updateTimelineVisibility(true)
      store.pause.set(true)
    } else if (chronologieStatus === 'disappearing') {
      this.chronologie.classList.remove('visible')
      this.internalUnbind()
      this.updateTimelineVisibility(false)
      store.pause.set(false)
    }
  }

  getChronologieOffset () {
    // TODO :: to get on resize too
    store.chronologieOffset.set({ x: this.chronologie.offsetWidth, y: this.chronologie.scrollTop })
  }

  checkCurrent () {
    // TODO :: to get on resize too
    let current
    let distCurrent = 10000
    this.factsOrdered.forEach((fact, index) => {
      let dist = Math.abs(this.chronologie.scrollTop - fact.top)
      if (dist < distCurrent) {
        distCurrent = this.chronologie.scrollTop - fact.top
        current = index
      }
    })
    store.chronologieCurrent.set({ index: current, el: this.factsOrdered[current], date: this.factsOrdered[current].date })
  }

  updateTimelineVisibility (bool) {
    store.chronologieTimelineVisible.set(bool)
  }
}
