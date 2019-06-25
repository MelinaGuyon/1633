import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import Glass from 'components/dom/Glass/Glass'
import store from 'state/store'
import anime from 'animejs'
import signals from 'state/signals'
import sortBy from 'lodash/sortBy'
import delay from 'lodash/delay'
import Inrtia from 'inrtia'
import { raf } from '@internet/raf'

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
    this.imageHidden = false

    return (
      <div class='fact locked' id={'fact' + props.id} ref={addRef(this, 'fact')}>
        <div class='content-container'>
          <img class='character' ref={addRef(this, 'character')} src={props.content.src} />
          <div class='content' ref={addRef(this, 'content')} >
            <PreviousButton id={props.id} factDate={props.content.date} goToDateOnChronoButton={props.goToDateOnChronoButton} />
            <div class='subContent' >
              <p class='title'>{props.content.title}</p>
              <p class='name'>{props.content.historyName} / {props.content.date}</p>
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
        <Glass ref={addRef(this, 'glass')} autostart parrent path={`glass/${props.content.historyId}/${props.content.img}`} moovingCb={this.moovingCb.bind(this)}/>
      </div>
    )
  }

  componentDidMount () {
    this.initParams()
  }

  initParams () {
    this.top = this.fact.offsetTop
  }

  moovingCb (mooving) {
    if (!this.locked) {
      if (mooving) {
        if (this.imageHidden) return
        this.imageHidden = true
        this.character.classList.add('hidden')
      } else {
        if (!this.imageHidden) return
        this.imageHidden = false
        this.character.classList.remove('hidden')
      }
    }
  }

  resize () {
    this.initParams()
  }
}

export default class Chronologie extends DomComponent {
  template ({ base }) {
    const loc = store.loc.get()

    this.historyNumber = 5 // temp, need to be replace with a real History number getted from store

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
        <div class='global-wrapper'>
          <div class='sorbone-infos'>
            <div class='sorbone-infos-container'>
              <h2>{loc['chronologie.title']}</h2>
              <p ref={addRef(this, 'chronologieDesc')} />
            </div>
          </div>
          {facts}
        </div>
      </section>
    )
  }

  componentDidMount () {
    const loc = store.loc.get()
    this.chronologieDesc.innerHTML = loc['chronologie.description']
    this.updateInrtia = this.updateInrtia.bind(this)
    this.mousewheelId = 0
    this.initInertia()
    this.bind()
  }

  initInertia () {
    const inrtiaOptions = {
      value: 0,
      friction: 16,
      precision: 5,
      perfectStop: true,
      interpolation: 'linear'
    }
    this.inrtia = {
      y: new Inrtia(inrtiaOptions)
    }
  }

  bind () {
    signals.factUnlock.listen(this.fastbind('onFactUnlocked', 1))
    this.listenStore('chronologieStatus', this.onChronologieClick)
    this.listenStore('size', this.resize)
    signals.forceReset.listen(this.reset)
  }

  internalBind () {
    // raf.add(this.updateInrtia)
    this.listenStore('chronologieDate', this.fastbind('goToDate', 1))
    window.addEventListener('mousewheel', this.fastbind('getChronologieOffset', 1))
    window.addEventListener('mousewheel', this.fastbind('checkCurrent', 1))
    window.addEventListener('mousewheel', this.fastbind('getMousewheelEnd', 1))
    this.facts.forEach((tab) => {
      tab.forEach((el) => {
        if (Math.abs(el.base.offsetTop - this.chronologie.scrollTop) < 3000) {
          el.glass.bind()
        }
      })
    })
  }

  bindGlasses (top) {
    let topRef = top || this.chronologie.scrollTop
    this.facts.forEach((tab) => {
      tab.forEach((el) => {
        if (Math.abs(el.base.offsetTop - topRef) < 3000) {
          el.glass.bind()
        }
      })
    })
  }

  internalUnbind () {
    // raf.remove(this.updateInrtia)
    this.unlistenStore('chronologieDate', this.goToDate)
    window.removeEventListener('mousewheel', this.getChronologieOffset)
    window.removeEventListener('mousewheel', this.checkCurrent)
    window.removeEventListener('mousewheel', this.getMousewheelEnd)
    this.facts.forEach((tab) => {
      tab.forEach((el) => {
        if (el.glass.binded) {
          el.glass.unbind()
        }
      })
    })
  }

  unbindGlasses () {
    this.facts.forEach((tab) => {
      tab.forEach((el) => {
        if (el.glass.binded) {
          el.glass.unbind()
        }
      })
    })
  }

  getMousewheelEnd () {
    this.inrtia.y.stopped = true
    clearTimeout(this.mousewheelId)
    this.mousewheelId = setTimeout(() => {
      this.unbindGlasses()
      this.bindGlasses()
      if (this.factsOrdered[0].base.offsetTop > this.chronologie.scrollTop) return
      this.inrtia.y.stopped = false
      this.chronologie.classList.remove('smooth')
      this.inrtia.y.value = this.chronologie.scrollTop
      this.inrtia.y.to(this.factsOrdered[this.current].base.offsetTop)
    }, 50)
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
      this.inrtia.y.stopped = true
      if (store.chronologieId.get() === 'top') this.chronologie.scrollTop = 0
      else this.chronologie.scrollTop = this.facts[store.currentHistory.get()][store.chronologieId.get()].base.offsetTop
      this.chronologie.classList.add('visible')
      this.getChronologieOffset()
      this.checkCurrent()
      this.internalBind()
      this.updateTimelineVisibility(true)
      this.stateGamePause = store.pause.get().paused
      this.stateGameMenu = store.menuGame.get()
      store.pause.set({ paused: true, allMuted: false })
      store.menuLight.set(true)
      store.menuSocials.set(false)
      store.menuGame.set(false)
      delay(() => {
        signals.newDom.dispatch()
        if (chronologieStatus === 'appearing') signals.moreNoise.dispatch(1)
      }, 900) // car animation css qui décale les points
    } else if (chronologieStatus === 'disappearing') {
      this.chronologie.classList.remove('visible')
      this.internalUnbind()
      this.updateTimelineVisibility(false)
      store.pause.set({ paused: this.stateGamePause, allMuted: false })
      store.menuLight.set(false)
      store.menuSocials.set(true)
      if (this.stateGameMenu) store.menuGame.set(this.stateGameMenu)
      signals.moreNoise.dispatch(0)
    }
  }

  getChronologieOffset () {
    store.chronologieOffset.set({ x: this.chronologie.offsetWidth, y: this.chronologie.scrollTop })
    delay(() => { signals.newDom.dispatch() }, 500)
  }

  unbindedGetChronologieOffset (top) {
    store.chronologieOffset.set({ x: this.chronologie.offsetWidth, y: top })
    delay(() => { signals.newDom.dispatch() }, 2500)
  }

  checkCurrent () {
    let current
    let distCurrent = 10000
    this.factsOrdered.forEach((fact, index) => {
      let dist = Math.abs(this.chronologie.scrollTop - fact.top)
      if (dist < distCurrent) {
        distCurrent = this.chronologie.scrollTop - fact.top
        current = index
      }
    })
    this.current = current
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
    this.unbindGlasses()
    this.bindGlasses(scrollTop)
    this.current = current
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

    this.inrtia.y.stopped = true
    let top = this.factsOrdered[index].base.offsetTop
    this.unbindedGetChronologieOffset(top)
    this.unbindedCheckCurrent(top)
    this.chronologie.classList.add('smooth')
    this.chronologie.scrollTop = top
  }

  goToDateOnChronoButton (date, factId) {
    this.inrtia.y.stopped = true
    let top = this.factsOrdered[factId].base.offsetTop
    this.unbindedGetChronologieOffset(top)
    this.unbindedCheckCurrent(top)
    this.chronologie.classList.add('smooth')
    this.chronologie.scrollTop = top
  }

  updateTimelineVisibility (bool) {
    store.chronologieTimelineVisible.set(bool)
  }

  updateInrtia () {
    if (!this.inrtia.y.stopped) {
      this.inrtia.y.update()
      this.chronologie.scrollTop = this.inrtia.y.value
      this.unbindedGetChronologieOffset(this.inrtia.y.value)
    }
  }

  resize () {
    delay(() => {
      this.getChronologieOffset()
      this.checkCurrent()
      this.factsOrdered.forEach((el) => {
        el.resize()
        el.glass.getCoords()
      })
    }, 1000)
  }

  reset () {
    store.chronologieStatus.set('disappearing')
  }
}
