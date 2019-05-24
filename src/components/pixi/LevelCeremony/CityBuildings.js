import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '4bg200', x: 0, y: -162,   tint: 0x77ddff }))
    this.mains.push(this.addComponent(Building, { layer: '4bg200', type: 'a',   x: 0, y: -150 }))
    // this.mains.push(this.addComponent(Light, { layer: '4bg200', form: 'light/main', target: this.base, x: 7, y: -63, tint: 0x886600, alpha: 1, scale: [0.3, 0.27] }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
