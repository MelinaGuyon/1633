import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '4bg600', type: 'a', x: 0, y: -50 }))
    this.mains.push(this.addComponent(Building, { layer: '4bg500', type: 'b', x: 0, y: -150 }))
    this.mains.push(this.addComponent(Building, { layer: '4bg400', type: 'c', x: 450, y: -200 }))
    this.mains.push(this.addComponent(Building, { layer: '4bg300', type: 'd', x: 300, y: 0 }))
    this.mains.push(this.addComponent(Building, { layer: '4bg200', type: 'e', x: -400, y: 0 }))
    this.mains.push(this.addComponent(Building, { layer: '4bg100', type: 'f', x: 0, y: 80 }))
    this.mains.push(this.addComponent(Building, { layer: '4bg100', type: 'g', x: -200, y: 220 }))
    // this.mains.push(this.addComponent(Light, { layer: '4bg200', form: 'light/main', target: this.base, x: 7, y: -63, tint: 0x886600, alpha: 1, scale: [0.3, 0.27] }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
