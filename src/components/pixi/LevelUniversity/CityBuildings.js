import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: 'bg600', x: -45, y: -162, scale: 0.4, tint: 0x77ddff }))
    this.mains.push(this.addComponent(Building, { layer: 'bg600', type: 'a', scale: 0.4, x: -50, y: -150 }))
    this.mains.push(this.addComponent(Light, { layer: 'bg600', target: this.base, x: 7, y: -63, tint: 0x886600, alpha: 1, scale: [0.3, 0.27] }))
    //, { layer: 'light', target: this.base, x: 7, y: -63, tint: 0x886600, alpha: 1, scale: [0.3, 0.27] })
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
