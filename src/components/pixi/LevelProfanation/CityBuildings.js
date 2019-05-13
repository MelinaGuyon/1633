import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: 'bg600', x: 215, y: -162, scale: 0.4, tint: 0x77ddff, collide: true }))
    // this.mains.push(this.addComponent(Building, { layer: 'bg600', type: 'a', scale: 0.4, x: 150, y: -150 }))

    this.mains.push(this.addComponent(Building, { layer: 'bg800', x: 0, y: -162, scale: 0.4, tint: 0x77ddff, collide: true }))
    this.mains.push(this.addComponent(Building, { layer: 'bg400', type: 'a', scale: 0.4, x: 0, y: -150, collide: true }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
