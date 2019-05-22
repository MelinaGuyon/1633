/* eslint-disable no-mixed-spaces-and-tabs,no-tabs */
import PixiComponent from 'abstractions/PixiComponent'
import Light from '../LevelCommon/Light'
import timer from 'utils/timer'
import Timeline from 'utils/Timeline'

export default class LevelLight extends PixiComponent {
  setup () {
    this.mains = []
    let light1 = this.addComponent(Light, { layer: '1f200', form: 'light/main', target: this.base, x: 100, y: -100, tint: 0xff0000, alpha: 1, scale: [0.3, 0.27], animation: 'flamme' })
    this.mains.push(light1)
	  this.blinky = new Timeline([
		  [function () {
			  light1.base.tint = 0xbb1111
		  }, 80],
		  [function () {
			  light1.base.tint = 0x990000
		  }, 80],
		  [function () {
			  light1.base.tint = 0xbb1111
		  }, 1984],
		  [function () {
			  light1.base.tint = 0x226699
		  }, 80],
		  [function () {
			  light1.base.tint = 0x115588
		  }, 80],
		  [function () {
			  light1.base.tint = 0x226699
		  }, 1984]
	  ], { loop: true })

	  this.timer(410, () => {
		  if (this.destroyed) return
		  this.blinky.play(0)
	  })
  }

  componentWillUnmount () {
    this.mains = undefined
  }

  update (dt, time) {
  	console.log('fonctionne pas TODO')
    this.updateTimers(dt)
    console.log(dt)
  }
}
