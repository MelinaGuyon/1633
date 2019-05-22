import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '1bg200', type: 'a', scale: 0.4, x: 0, y: -150 })) // big
    this.mains.push(this.addComponent(Building, { layer: '1bg100', x: 0, y: -162, scale: 0.4, tint: 0x77ddff })) // small
    // this.mains.push(this.addComponent(Light, { layer: '1bg200', form: 'light/main', target: this.base, x: 0, y: -63, tint: 0x886600, alpha: 1, scale: [0.3, 0.27] }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
