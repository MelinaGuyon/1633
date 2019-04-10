/* global IS_DEV */

import { createStore } from '@internet/state'
import languages from '../languages'
import sceneLayers from './sceneLayers'

const isDev = IS_DEV
const ratio = window.devicePixelRatio <= 2 ? 1 : 1.5

export default createStore({
  // app version number
  version: VERSION, /* global VERSION */

  // ---- i18n / base ----
  lang: window.__conf.lang,
  loc: window.__conf.loc,
  languages: Object.keys(languages),
  baseUrl: window.__conf.baseUrl,

  // ---- screen device infos ----
  size: [0, 0],
  pixelRatio: ratio,

  // ---- scene ----
  sceneLayers,
  levelDict: {
    0: 'university',
    1: 'city',
    2: 'sky',
    3: 'space',
    4: 'end'
  },
  levelId: null,
  levelInstance: null,
  scenePosition: [0],
  frameDuration: 70, // default animation's frame duration

  // ---- Debug utilities ----
  mute: isDev ? 0 : 0, // Mute game
  useGui: isDev ? 1 : 0, // use datGui
  displayStats: isDev ? 1 : 0, // use stats (fps, drawcalls, ...)

  // ---- game ----
  pause: false, // Is the game paused

  // ---- assets to preload ----
  atlases: {
    sheet: 'assets/atlas.json',
    smoothsheet: 'assets/atlas-smooth.json'
  },
  images: {
    rotate: 'assets/gif/rotate.gif'
  },

  // ---- stored animations ----
  animations: {},

  // ---- stored non animated textures ----
  textures: {}
})
