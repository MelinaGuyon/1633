/* global Image */

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
import bank from 'state/sounds'

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

    // TODO:: see if we can see why 2 and not 1
    // To change quand il y aura plusieur atlas/assets pixi
    this.loadCompteur = 0
    this.loadingElementsLength =
      store.imagesToPreload.get().length + 2 +
      Object.keys(bank.musics).length +
      Object.keys(bank.voices).length +
      Object.keys(bank.sfxs).length

    return (
      <section class='prld fxd' ref={addRef(this, 'prld')}>
        <div class='fakeBg' ref={addRef(this, 'bg')} />
        <Glass ref={addRef(this, 'glass')} autostart={false} path={'glass-loading'} />
        <div class='title-container-l1'>
          <div class='title-container-l2' ref={addRef(this, 'title')}>
            <h2 class='title-bordered'>{loc['site.title']}</h2>
            <div class='title-wrapper' ref={addRef(this, 'wrapper')}>
              <h2 class='title-full'>{loc['site.title']}</h2>
            </div>
          </div>
          <p class='baseline' ref={addRef(this, 'baseline')}>{loc['site.baseline']}</p>
        </div>
      </section>
    )
  }

  componentDidMount () {
    this.log = logger('Preloader', '#47b342').log
    this.bind()
    this.initInertia()
    this.load()
    signals.moreNoise.dispatch(1)

    this.prld.classList.add('is-visible')
  }

  componentWillUnmount () {
    this.unbind()
  }

  bind () {
    signals.soundLoaded.listen(this.fastbind('updateCompteur', 1))
    raf.add(this.updateInertia.bind(this))
  }

  unbind () {
    signals.soundLoaded.unlisten(this.updateCompteur)
    raf.remove(this.updateInertia)
  }

  initInertia () {
    const inrtiaOptions = {
      value: 0,
      friction: 20,
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

      loader.onProgress.add(() => { this.updateCompteur() })
      loader.load((loader, resources) => {
        for (let k in resources) {
          if (~atlasesKeys.indexOf(k)) this.createTexFromAtlas(resources[k], k)
        }
        resolve()
      })
    })
  }

  updateCompteur (tets) {
    this.loadCompteur++
    this.animeLoader()
  }

  loadImage (k, i) {
    return new Promise(resolve => {
      const el = new Image()
      el.onload = () => {
        this.updateCompteur(true)
        el.onload = undefined
        store.images.get()[k] = el
        resolve()
      }
      el.src = k
    })
  }

  imagesLoad () {
    const imagesToPreload = store.imagesToPreload.get()
    const images = store.images.get()

    const p = []
    for (let i = 0; i < imagesToPreload.length; i++) {
      const k = imagesToPreload[i]
      if (images[k]) return
      p.push(this.loadImage(k, i))
    }
    store.imagesToPreload.set([])
    return Promise.all(p)
  }

  animeLoader () {
    // 80 DUE TO ECZAR
    let p = (this.loadCompteur / this.loadingElementsLength) * 80
    this.inrtia.percent.to(p)
  }

  updateInertia () {
    if (!this.inrtia.percent.stopped) {
      this.inrtia.percent.update()
      this.wrapper.style.height = `${this.inrtia.percent.value}%`
      // 78 DUE TO ECZAR
      if (this.inrtia.percent.value > 78 && !this.animationCompleted) {
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

    Promise.all([this.imagesLoad(), this.pixiLoad()])
      .then(() => {
        if (store.skipLoading.get()) return this.directCompleteLoading()
        this.glass.start()
        this.intervalId = setInterval(() => {
          if (this.animationCompleted && store.started.get()) this.completeLoading()
        }, 10)
      })
  }

  directCompleteLoading () {
    sound.play('3_music_studio')
    sound.setMusic('3_music_studio')
    this.props.onComplete() // launch game
    this.prld.classList.add('loaded')
  }

  completeLoading () {
    clearInterval(this.intervalId) // stop check if animation is done
    this.unbind()
    this.log('complete')

    const tl1 = anime.timeline({
      easing: 'easeInOutQuad',
      duration: 700
    })
    const tl2 = anime.timeline({
      easing: 'easeInOutQuad',
      duration: 700
    })
    const tl3 = anime.timeline({
      easing: 'easeInOutQuad',
      duration: 700
    })
    const tl4 = anime.timeline({
      easing: 'easeInOutQuad',
      duration: 700
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
      .add({
        targets: this.title,
        opacity: 0,
        delay: 3000
      })

    tl3
      .add({
        targets: this.wrapper,
        opacity: 0
      })

    tl4
      .add({
        targets: this.baseline,
        opacity: 1,
        delay: 500,
        complete: () => {
          delay(() => { this.bg.classList.add('visible') }, 300)
          delay(() => {
            sound.play('3_music_studio')
            sound.setMusic('3_music_studio')
          }, 1000)
          delay(() => {
            signals.moreNoise.dispatch(0)
          }, 200)
        }
      })
      .add({
        targets: this.baseline,
        opacity: 0,
        delay: 3000 - 500,
        complete: () => {
          this.props.onComplete() // launch game
          delay(() => { this.prld.classList.add('loaded') }, 600)
        }
      })
  }
}
