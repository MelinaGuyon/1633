/* global IS_DEV, VERSION */

import { createStore } from '@internet/state'
import languages from '../languages'
import sceneLayers from './sceneLayers'
import subtitlesFr from './subtitlesFr'
import subtitlesEn from './subtitlesEn'

const isDev = IS_DEV
const ratio = window.devicePixelRatio <= 2 ? 1 : 1.5

export default createStore({
  version: VERSION, // app version number

  // ---- i18n / base ----
  lang: window.__conf.lang,
  loc: window.__conf.loc,
  languages: Object.keys(languages),
  baseUrl: window.__conf.baseUrl,

  // ---- screen device infos ----
  size: [0, 0],
  mouse: [0, 0],
  pixelRatio: ratio,
  sceneScale: 1,

  // ---- history ----
  history: {
    0: 'richelieu',
    1: 'mariecurie',
    2: 'robertdesorbon',
    3: 'jacqueslemercier',
    4: 'napoleononaparte'
  },

  chapterId: 0,

  // ---- scene ----
  sceneLayers,
  subtitles: window.__conf.lang === 'fr' ? subtitlesFr : subtitlesEn,
  levelDict: {
    0: 'university',
    1: 'church',
    2: 'profanation',
    3: 'ceremony',
    4: 'pharmacist',
    5: 'napoleon',
    6: 'recovery'
  },
  levelId: null,
  levelInstance: null,
  levelSecurity: 2,

  // ---- chronologie ----
  chronologieStatus: null,
  factsStatus: [
    'locked',
    'locked',
    'locked',
    'locked',
    'locked'
  ],

  frameDuration: 70, // default animation's frame duration

  // ---- Debug utilities: 0 means false, 1 means true ----
  debug: isDev ? 0 : 0,
  mute: isDev ? 0 : 0,
  useGui: isDev ? 1 : 0, // use datGui
  displayStats: isDev ? 1 : 0, // use stats (fps, drawcalls, ...)
  skipCarousel: isDev ? 1 : 0,
  skipLoading: isDev ? 0 : 0,

  // ---- game ----
  loaded: false, // Is app loaded
  started: false, // Is app started
  pause: false, // Is the current game paused
  musicPlayed: false,

  // ---- assets to preload ----
  atlases: {
    sheet: 'assets/pharmacien.json',
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
