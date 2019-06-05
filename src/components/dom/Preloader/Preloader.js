import './Preloader.styl'

import { h, addRef } from '@internet/dom'
import { raf } from '@internet/raf'
import logger from 'utils/logger'
import { loader, SCALE_MODES } from 'pixi.js'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import cachebust from 'utils/cachebust'
import Glass from 'components/dom/Glass/Glass'
import sound from 'controllers/sound'
import Inrtia from 'inrtia'
import mouse from 'controllers/mouse'
import signals from 'state/signals'
import anime from 'animejs'
import delay from 'lodash/delay'

function isFromAnim (tex, anims) {
  for (let k in anims) {
    for (let i = 0; i < anims[k].length; i++) {
      if (tex === anims[k][i]) return true
    }
  }
  return false
}

export default class Preloader extends DomComponent {
  template ({ base }) {
    const loc = store.loc.get()
    return (
      <section class='prld fxd' ref={addRef(this, 'prld')}>
        <Glass ref={addRef(this, 'glass')} />
        <div class='title-container-l1'>
          <div class='title-container-l2' ref={addRef(this, 'title')}>
            <h2 class='title-bordered'>{loc['site.title']}</h2>
            <div class='title-wrapper' ref={addRef(this, 'wrapper')}>
              <h2 class='title-full'>{loc['site.title']}</h2>
            </div>
          </div>
          <p class='baseline' ref={addRef(this, 'baseline')}>Il était une fois la Sorbonne</p>
        </div>
      </section>
    )
  }

  componentDidMount () {
    this.log = logger('Preloader', '#47b342').log
    this.bind()
    this.initInertia()
    this.load()

    this.prld.classList.add('is-visible')
  }

  componentWillUnmount () {
    this.unbind()
  }

  bind () {
    raf.add(this.updateInertia.bind(this))
  }

  unbind () {
    raf.remove(this.updateInertia)
  }

  initInertia () {
    const inrtiaOptions = {
      value: 0,
      friction: 40,
      precision: 5,
      perfectStop: true,
      interpolation: 'linear'
    }
    this.inrtia = {
      percent: new Inrtia(inrtiaOptions)
    }
  }

  createTexFromAtlas (atlas, key) {
    const sheet = atlas.spritesheet

    sheet.baseTexture.scaleMode = SCALE_MODES.LINEAR
    sheet.baseTexture.mipmap = true

    const anims = sheet.animations || {}
    const texs = {}

    for (let k in sheet.textures) {
      if (!isFromAnim(sheet.textures[k], anims)) {
        anims[k] = [sheet.textures[k]]
        texs[k] = [sheet.textures[k]]
      }
    }

    store.textures.set(Object.assign(store.textures.get(), texs))
    store.animations.set(Object.assign(store.animations.get(), anims))
  }

  pixiLoad () {
    return new Promise(resolve => {
      // Queue atlas textures
      const atlases = store.atlases.get()
      const atlasesKeys = Object.keys(atlases)
      for (let k in atlases) loader.add(k, cachebust(atlases[k])) // add version to cachebust

      loader.onProgress.add(() => { this.animeLoader(loader.progress) })
      loader.load((loader, resources) => {
        for (let k in resources) {
          if (~atlasesKeys.indexOf(k)) this.createTexFromAtlas(resources[k], k)
        }
        resolve()
      })
    })
  }

  animeLoader (progress) {
    // TODO : change with animejs
    this.inrtia.percent.to(progress)
  }

  updateInertia () {
    if (!this.inrtia.percent.stopped) {
      this.inrtia.percent.update()
      this.wrapper.style.height = `${this.inrtia.percent.value}%`
      if (this.inrtia.percent.value > 95 && !this.animationCompleted) {
        this.animationCompleted = true
        store.loaded.set(true)
        if (!store.skipLoading.get()) {
          signals.newIndication.dispatch(1)
          mouse.bindHolding(this.glass.construct)
        }
      }
    }
  }

  load () {
    sound.setup()

    Promise.all([this.pixiLoad()])
      .then(() => {
        if (store.skipLoading.get()) return this.completeLoading()
        this.intervalId = setInterval(() => {
          if (this.animationCompleted && store.started.get()) this.completeLoading()
        }, 10)
      })
  }

  completeLoading () {
    clearInterval(this.intervalId) // stop check if animation is done
    this.unbind()
    this.log('complete')
    // this.props.onComplete() // launch game
    // this.prld.classList.add('loaded')

    const tl1 = anime.timeline({
      easing: 'easeInOutQuad',
      duration: 600
    })
    const tl2 = anime.timeline({
      easing: 'easeInOutQuad',
      duration: 600
    })
    const tl3 = anime.timeline({
      easing: 'easeInOutQuad',
      duration: 600
    })

    tl1
      .add({
        targets: this.glass.base,
        opacity: 0
      })

    tl2
      .add({
        targets: this.title,
        opacity: 0.2
      })

    tl3
      .add({
        targets: this.baseline,
        opacity: 1,
        delay: 300,
        complete: () => {
          delay(() => { this.prld.classList.add('state2')}, 300)
          delay(() => { this.prld.classList.add('state3')}, 600)
          delay(() => { this.prld.classList.add('state4')}, 900)
        }
      })
  }
}
