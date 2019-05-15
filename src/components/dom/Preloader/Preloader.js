import './Preloader.styl'

import logger from 'utils/logger'
import { loader, SCALE_MODES } from 'pixi.js'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import cachebust from 'utils/cachebust'
import sound from 'controllers/sound'

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
    return base
  }

  componentDidMount () {
    this.log = logger('Preloader', '#47b342').log
    this.load()
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

      // Trigger loading from Pixi Loader
      loader.load((loader, resources) => {
        for (let k in resources) {
          if (~atlasesKeys.indexOf(k)) this.createTexFromAtlas(resources[k], k)
        }
        resolve()
      })
    })
  }

  load () {
    sound.setup()

    Promise.all([this.pixiLoad()])
      .then(() => {
        this.log('complete')
        this.props.onComplete()
      })
  }
}
