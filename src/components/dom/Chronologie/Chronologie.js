import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import Glass from 'components/dom/Glass/Glass'
import store from 'state/store'
import anime from 'animejs'
import signals from 'state/signals'
import sortBy from 'lodash/sortBy'
import delay from 'lodash/delay'

import './Chronologie.styl'

class PreviousButton extends DomComponent {
  template (props) {
    return (
      <img src='assets/img/pictos/arrow-top.svg' class='buttonFact buttonFactTop magnet' data-id={props.id} />
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
    if (previousFactId >= 0) {
      this.props.goToDateOnChronoButton(this.props.factDate, previousFactId)
    }
  }
}

class NextButton extends DomComponent {
  template (props) {
    return (
      <img src='assets/img/pictos/arrow-bottom.svg' class='buttonFact buttonFactBottom magnet' data-id={props.id} />
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
    let factsArray = this.props.factsArray
    if (nextFactId < factsArray.length) {
      this.props.goToDateOnChronoButton(this.props.factDate, nextFactId)
    }
  }
}

class Fact extends DomComponent {
  template (props) {
    this.date = props.content.date
    this.locked = true

    console.log(props.content.historyId, props.content.img)

    return (
      // <div class='fact locked' id={'fact' + props.id} ref={addRef(this, 'fact')}>
      <div class='fact locked' id={'fact' + props.id} ref={addRef(this, 'fact')}>
        <div class='content-container'>
          <div class='content' ref={addRef(this, 'content')} >
            <PreviousButton id={props.id} factDate={props.content.date} goToDateOnChronoButton={props.goToDateOnChronoButton} />
            <div class='subContent' >
              <p class='title'>{props.content.title}</p>
              <p class='name'>{props.content.historyName}</p>
              <p class='text'>{props.content.text}</p>
              <p class='links'>
                <a href={props.content.textUrl} target='_blank' class='textLink magnet'>texte / {props.content.textUrlTitle}</a>
                <a href={props.content.imageUrl} target='_blank' class='imageLink magnet'>image / {props.content.imageUrlTitle}</a>
              </p>
            </div>
            <NextButton id={props.id} factsArray={props.factsArray} factDate={props.content.date} goToDateOnChronoButton={props.goToDateOnChronoButton} />
          </div>
        </div>

        <div class='locked-title'>
          <h2>{props.content.title}</h2>
          <h3>{props.content.historyName}</h3>
        </div>
        <Glass ref={addRef(this, 'glass')} autostart parrent path={`glass/${props.content.historyId}/${props.content.img}`} />
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
    // this.base.addEventListener('mousemove', this.fastbind('onMouseMove', 1))
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
      facts.push(<Fact ref={refFacts(i)} id={i} content={this.chronologieDatas[i]} factsArray={this.factsOrdered} goToDateOnChronoButton={this.goToDateOnChronoButton.bind(this)} />)
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
    this.listenStore('chronologieDate', this.fastbind('goToDate', 1))
    window.addEventListener('mousewheel', this.fastbind('getChronologieOffset', 1))
    window.addEventListener('mousewheel', this.fastbind('checkCurrent', 1))
    this.facts.forEach((tab) => {
      tab.forEach((el) => {
        el.glass.bind()
      })
    })
  }

  internalUnbind () {
    this.unlistenStore('chronologieDate', this.goToDate)
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
    this.facts[store.currentHistory.get()][id].locked = false
    this.chronologie.classList.remove('smooth')
    this.chronologie.scrollTop = 0
    this.facts[store.currentHistory.get()][id].glass.construct()
  }

  onChronologieClick (chronologieStatus, top) {
    if (chronologieStatus === 'appearing') {
      this.chronologie.classList.remove('smooth')
      if (store.chronologieId.get() === 'top') this.chronologie.scrollTop = 0
      else this.chronologie.scrollTop = this.facts[store.currentHistory.get()][store.chronologieId.get()].base.offsetTop
      this.chronologie.classList.add('visible')
      this.getChronologieOffset()
      this.checkCurrent()
      this.internalBind()
      this.updateTimelineVisibility(true)
      store.pause.set(true)
      store.menuLight.set(true)
      store.menuSocials.set(false)
      delay(() => { signals.newDom.dispatch() }, 1000) // car animation css qui décale les points
    } else if (chronologieStatus === 'disappearing') {
      this.chronologie.classList.remove('visible')
      this.internalUnbind()
      this.updateTimelineVisibility(false)
      store.pause.set(false)
      store.menuLight.set(false)
      store.menuSocials.set(true)
    }
  }

  getChronologieOffset () {
    // TODO :: to get on resize too
    store.chronologieOffset.set({ x: this.chronologie.offsetWidth, y: this.chronologie.scrollTop })
    delay(() => { signals.newDom.dispatch() }, 500)
  }

  unbindedGetChronologieOffset (top) {
    // TODO :: to get on resize too
    store.chronologieOffset.set({ x: this.chronologie.offsetWidth, y: top })
    delay(() => { signals.newDom.dispatch() }, 2500)
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

  unbindedCheckCurrent (scrollTop) {
    let current
    let distCurrent = 10000
    this.factsOrdered.forEach((fact, index) => {
      let dist = Math.abs(scrollTop - fact.top)
      if (dist < distCurrent) {
        distCurrent = scrollTop - fact.top
        current = index
      }
    })
    store.chronologieCurrent.set({ index: current, el: this.factsOrdered[current], date: this.factsOrdered[current].date })
  }

  goToDate (date) {
    let index
    let newDate = null
    this.factsOrdered.forEach((fact, i) => {
      if (fact.date >= date && !newDate) {
        index = i
        newDate = fact.date
      }
    })
    if (!newDate) {
      index = this.factsOrdered.length - 1
    }

    let top = this.factsOrdered[index].base.offsetTop
    this.unbindedGetChronologieOffset(top)
    this.unbindedCheckCurrent(top)
    this.chronologie.classList.add('smooth')
    this.chronologie.scrollTop = top
  }

  goToDateOnChronoButton (date, factId) {
    let top = this.factsOrdered[factId].base.offsetTop
    this.unbindedGetChronologieOffset(top)
    this.unbindedCheckCurrent(top)
    this.chronologie.classList.add('smooth')
    this.chronologie.scrollTop = top
  }

  updateTimelineVisibility (bool) {
    store.chronologieTimelineVisible.set(bool)
  }
}
