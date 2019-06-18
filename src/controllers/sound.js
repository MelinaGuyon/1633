import { Howler } from 'howler'
import Sample from 'abstractions/Sample'
import store from 'state/store'
import bank from 'state/sounds'

const samples = {}
let hidden = [] // Used to store the good visibility change method
let muted = false
let setupped = false

let music = null
let voicePlay = false
let effectPlay = false

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

  for (let k in bank.voices) {
    const voiceOpts = bank.voices[k]
    samples[k] = new Sample(Object.assign({
      type: 'voice',
      key: k
    }, voiceOpts))
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
  store.pause.listen(togglePause)

  toggleMute(store.mute.get())
}

function setVoicePlay (sound) {
  voicePlay = sound
}

function setEffectPlay (sound) {
  effectPlay = sound
}

function setMusic (sound) {
  music = sound
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

function togglePause (obj) {
  obj.paused ? pause(obj) : unpause()
}

function pause (opts = {}) {
  if (opts.allMuted) {
    for (let k in samples) samples[k].pause()
  } else {
    for (let k in samples) {
      if (k !== music) samples[k].pause(opts)
    }
  }
}

function unpause (opts = {}) {
  for (let k in samples) samples[k].unpause(opts)
}

function onVisibilityChange () {
  if (document[hidden[1]]) {
    pause({ all: true })
    mute(true)
  } else if (muted) {
    unmute()
    unpause({ keepQuiet: store.pause.get().paused })
  }
}

function play (key, opts = {}) {
  if (samples[key]) {
    samples[key].play(opts)
  }
}

function stop (key, opts = {}) {
  if (samples[key]) samples[key].stop(opts)
}

function update (dt) {
  for (let k in samples) samples[k].update(dt)
}

function voiceIsPlaying (dt) {
  if (!samples[voicePlay]) return { sound: voicePlay, playing: false }
  else return { sound: voicePlay, playing: samples[voicePlay].state.playing }
}

function effectIsPlaying (dt) {
  if (!samples[effectPlay]) return { sound: effectPlay, playing: false }
  else return { sound: effectPlay, playing: samples[effectPlay].state.playing }
}

export default {
  setup,
  mute,
  unmute,
  pause,
  unpause,
  play,
  stop,
  update,
  getMusic: () => { return music },
  setVoicePlay,
  voiceIsPlaying,
  setEffectPlay,
  effectIsPlaying,
  setMusic
}
