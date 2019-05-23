import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '5bg100', x: 730, type: 'a', scale: 0.9, y: -50 }))
    this.mains.push(this.addComponent(Building, { layer: '5bg200', x: 800, type: 'b', y: -50, scale: 0.9 }))
    this.mains.push(this.addComponent(Building, { layer: '5bg300', x: 800, type: 'c', scale: 0.9, y: -50 }))
    this.mains.push(this.addComponent(Building, { layer: '5bg200', x: 300, type: 'd', scale: 0.9, y: -100 }))
    this.mains.push(this.addComponent(Building, { layer: '5bg300', x: 100, type: 'e', scale: 0.9, y: -150 }))
    this.mains.push(this.addComponent(Building, { layer: '5bg400', x: 600, type: 'f', scale: 0.9, y: -50 }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
