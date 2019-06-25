/* global IS_DEV, IS_PREZ, VERSION */

import { createStore } from '@internet/state'
import languages from '../languages'
import sceneLayers from './sceneLayers'
import sceneLayersPrez from './sceneLayersPrez'
import subtitlesFr from './subtitlesFr'
import subtitlesEn from './subtitlesEn'
import chronologieFr from './chronologieFr'
import chronologieEn from './chronologieEn'
import levels from './levels'
import levelsPrez from './levelsPrez'

console.log(IS_PREZ)

const isDev = IS_DEV
const isPrez = IS_PREZ
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
  frameDuration: 70, // default animation's frame duration

  // ---- history ----
  currentHistory: 0,
  allHistories: [
    'richelieu',
    'robertdesorbon',
    'visconti',
    'mariecurie',
    'nenot',
    'lemercier'
  ],

  // ---- scene ----
  sceneLayers: IS_PREZ ? sceneLayersPrez : sceneLayers,
  subtitles: window.__conf.lang === 'fr' ? subtitlesFr : subtitlesEn,
  levelDict: IS_PREZ ? levelsPrez[0] : levels[0],
  levelId: null,
  levelInstance: null,
  levelSecurity: 2,

  // ---- chronologie ----
  chronologieOffset: { x: window.innerWidth, y: 0 },
  chronologie: window.__conf.lang === 'fr' ? chronologieFr : chronologieEn,
  chronologieStatus: null,
  chronologieId: null,
  chronologieIdsTable: [],
  chronologieCurrent: {},
  chronologieDate: null,
  chronologieTimelineVisible: false,

  // ---- about ----
  aboutStatus: null,

  // ---- Debug utilities: 0 means false, 1 means true ----
  debug: isDev ? 0 : 0,
  useGui: isDev ? 1 : 0, // use datGui
  displayStats: isDev ? 1 : 0, // use stats (fps, drawcalls, ...)
  skipCarousel: isDev ? 0 : 0,
  skipLoading: isDev ? 1 : 0,
  skipTuto: isDev ? 1 : 0,

  // ---- game ----
  loaded: false, // Is app loaded
  started: false, // Is app started
  launched: false, // Is a game launched
  pause: { paused: false, allMuted: false }, // Is the current game paused
  mute: false, // Is the current game muted
  ended: false, // Is the current game ended
  musicPlayed: false,
  menuLight: false,
  menuSocials: true,
  menuGame: false,

  // prez build
  isPrez: isPrez,

  // ---- assets to preload ----
  atlases: {
    sheet: 'assets/pixi/assets-0.json'
  },
  images: {

  },
  imagesToPreload: [
    'assets/img/glass-loading/glass-0.png',
    'assets/img/glass-loading/glass-1.png',
    'assets/img/glass-loading/glass-2.png',
    'assets/img/glass-loading/glass-3.png',
    'assets/img/glass-loading/glass-4.png',
    'assets/img/glass-loading/glass-5.png',
    'assets/img/glass-loading/glass-6.png'
  ],

  // ---- stored animations ----
  animations: {},

  // ---- stored non animated textures ----
  textures: {}
})
