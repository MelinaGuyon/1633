import { Howler } from 'howler'
import Sample from 'abstractions/Sample'
import store from 'state/store'
import bank from 'state/sounds'

const samples = {}
let hidden = [] // Used to store the good visibility change method
let muted = false
let setupped = false
function setup () {
  if (setupped) return
  setupped = true

  for (let k in bank.sfxs) {
    const sfxOpts = bank.sfxs[k]
    samples[k] = new Sample(Object.assign({
      type: 'sfx',
      key: k
    }, sfxOpts))
  }

  for (let k in bank.musics) {
    const musicOpts = bank.musics[k]
    samples[k] = new Sample(Object.assign({
      type: 'music',
      key: k
    }, musicOpts))
  }

  if (typeof document.hidden !== 'undefined') { hidden[0] = 'visibilitychange'; hidden[1] = 'hidden' }
  else if (typeof document.msHidden !== 'undefined') { hidden[0] = 'msvisibilitychange'; hidden[1] = 'msHidden' }
  else if (typeof document.webkitHidden !== 'undefined') { hidden[0] = 'webkitvisibilitychange'; hidden[1] = 'webkitHidden' }
  if (hidden[0]) document.addEventListener(hidden[0], onVisibilityChange, false)
  store.mute.listen(toggleMute)
  toggleMute(store.mute.get())
}

function toggleMute (bool) {
  bool ? mute() : unmute()
}

function mute (force) {
  if (!force && (muted || !store.mute.get())) return
  Howler.mute(true)
  muted = true
}

function unmute () {
  if (!muted || store.mute.get()) return
  Howler.mute(false)
  muted = false
}

function onVisibilityChange () {
  if (document[hidden[1]]) {
    pause({ all: true })
    mute(true)
  } else if (muted) {
    unmute()
    unpause({ keepQuiet: store.pause.get() })
  }
}

function play (key, opts = {}) {
  // log('Play ' + key)
  // Special case for jump and land: play the sound corresponding to the current level
  if (key === 'player_jump' || key === 'player_land') {
    const level = store.levelDict.get()[store.level.get()]
    if (level === 'sky') key += '_cape'
    else if (level === 'space' || level === 'end') key += '_space'
  }

  if (samples[key]) samples[key].play(opts)
}

function stop (key, opts = {}) {
  if (samples[key]) samples[key].stop(opts)
}

function pause (opts = {}) {
  for (let k in samples) samples[k].pause(opts)
}

function unpause (opts = {}) {
  for (let k in samples) samples[k].unpause(opts)
}

function update (dt) {
  for (let k in samples) samples[k].update(dt)
}

export default {
  setup,
  mute,
  unmute,
  pause,
  unpause,
  play,
  stop,
  update
}
