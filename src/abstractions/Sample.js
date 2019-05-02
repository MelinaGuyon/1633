import { Howl } from 'howler'
import cachebust from 'utils/cachebust'
import prng from 'utils/prng'

const DEFAULT_VOLUME = 1

export default class Sample {
  constructor (props = {}) {
    this.key = props.key + '' // Id of the sample
    this.type = props.type || 'music' // Type of sample - sfx or music
    this.fadeIn = props.fadeIn | 0 // FadeIn duration
    this.fadeOut = props.fadeOut | 0 // FadeOut duration
    this.count = props.count || 1 // Number of samples - only used for Sfx
    this.loop = !!props.loop // Does the sfx loop - only used for Sfx
    this.sequence = !!props.sequence // Read sfx in order - default is randomized - only used for Sfx
    this.spreadPitch = props.spreadPitch || 0 // Randomize pitch = only used for Sfx

    this.volume = props.volume !== undefined ? props.volume : DEFAULT_VOLUME // Base volume of the sound
    if (this.type === 'music') this.sounds = { intro: null, loop: null }
    else if (this.type === 'sfx') this.sounds = []
    this.loadSamples()

    // Current Sample state
    this.state = {
      sound: null,
      id: null,
      playing: false,
      index: 0,
      fadeInMax: 0,
      fadeInTimer: 0,
      fadeOutMax: 0,
      fadeOutTimer: 0,
      volume: 0,
      paused: false,
      quiet: false
    }
  }

  play (opts = {}) {
    this.stop({ instant: true }) // stop current sound
    if (this.type === 'music') { // Play a music
      this.state.sound = opts.musicloop ? this.sounds.loop : this.sounds.intro
      this.state.id = this.state.sound.play()
    } else if (this.type === 'sfx') { // Play a Sfx
      if (opts.id !== undefined) this.state.index = opts.id // play specific sample
      else if (this.count > 1) { // play random or in order
        this.state.index = this.sequence
          ? (this.state.index + 1) % this.count
          : Math.floor(Math.random() * this.count)
      }
      if (!this.sounds[this.state.index]) return
      this.state.sound = this.sounds[this.state.index]
      this.state.id = this.state.sound.play()
      if (this.spreadPitch) this.state.sound.rate(prng.randomFloat(1 - this.spreadPitch, 1 + this.spreadPitch), this.state.id)
    }

    const fadeIn = opts.fadeIn || this.fadeIn
    if (opts.instant || fadeIn <= 0) {
      this.state.fadeInMax = 0
      this.state.fadeInTimer = 0
      this.state.volume = this.volume
      if (this.type === 'music' && this.state.quiet) this.state.sound.volume(this.volume * 0.5, this.state.id)
      else this.state.sound.volume(this.volume, this.state.id)
    } else {
      this.state.fadeInMax = fadeIn
      this.state.fadeInTimer = fadeIn
      this.state.volume = 0
      this.state.sound.volume(0, this.state.id)
    }
    this.state.paused = false
    this.state.playing = true
  }

  pause (opts = {}) {
    if (!this.state.playing || !this.state.sound || !this.state.id) return
    if (this.state.paused) return
    if (!opts.all && this.type === 'music') {
      this.state.sound.volume(this.state.volume * 0.5, this.state.id)
      this.state.quiet = true
    } else {
      this.state.sound.pause(this.state.id)
      this.state.paused = true
    }
  }

  unpause (opts = {}) {
    if (opts.keepQuiet && !this.state.quiet) return
    const curPaused = this.state.paused
    if (!opts.keepQuiet) this.state.quiet = false
    this.state.paused = false
    if (!this.state.playing || !this.state.sound || !this.state.id) return
    if (curPaused) this.state.sound.play(this.state.id)
    if (this.type === 'music') {
      if (this.state.quiet) this.state.sound.volume(this.volume * 0.5, this.state.id)
      else this.state.sound.volume(this.volume, this.state.id)
    }
  }

  update (dt) {
    if (!dt || !this.state.playing || !this.state.sound || !this.state.id) return
    if (this.state.fadeInTimer > 0) {
      this.state.fadeInTimer = Math.max(0, this.state.fadeInTimer - dt)
      const progress = 1 - (this.state.fadeInTimer / this.state.fadeInMax)
      this.state.volume = progress * this.volume
      this.state.sound.volume(this.state.volume, this.state.id)
    } else if (this.state.fadeOutTimer > 0) {
      this.state.fadeOutTimer = Math.max(0, this.state.fadeOutTimer - dt)
      if (this.state.fadeOutTimer === 0) return this.stop({ instant: true })
      const progress = this.state.fadeOutTimer / this.state.fadeOutMax
      this.state.volume = progress * this.volume
      this.state.sound.volume(this.state.volume, this.state.id)
    }
  }

  stop (opts = {}) {
    const id = this.state.id
    const sound = this.state.sound
    if (!id || !sound) return

    this.state.fadeInMax = 0
    this.state.fadeInTimer = 0
    const fadeOut = opts.fadeOut || this.fadeOut
    if (opts.instant || fadeOut <= 0) {
      this.state.volume = 0
      this.state.fadeOutMax = 0
      this.state.fadeOutTimer = 0
      sound.stop(id)
      this.state.id = null
      this.state.sound = null
      this.playing = false
    } else {
      this.state.paused = false
      if (this.state.fadeOutMax > 0) { return }
      this.state.fadeOutMax = fadeOut
      this.state.fadeOutTimer = fadeOut
    }
  }

  loadSamples () {
    console.log('test', this.key)
    if (this.type === 'music') {
      this.sounds.intro = new Howl({
        src: cachebust('assets/sounds/' + this.key + '_intro.mp3'),
        onend: () => {
          this.play({ musicloop: true })
        }
      })
      this.sounds.loop = new Howl({
        src: cachebust('assets/sounds/' + this.key + '_loop.mp3'),
        loop: true
      })
    } else if (this.type === 'sfx') {
      const urls = []
      for (let i = 1; i <= this.count; i++) {
        const index = this.count > 1 ? i : '' // use index only if there is more than one sample
        urls.push(cachebust('assets/sounds/' + this.key + index + '.mp3'))
      }
      for (let i = 0; i < urls.length; i++) {
        const sound = new Howl({
          src: [urls[i]],
          loop: this.loop,
          volume: this.volume,
          onend: () => {
            if (this.loop) return
            this.stop({ instant: true })
          }
        })
        this.sounds.push(sound)
      }
    }
  }
}
