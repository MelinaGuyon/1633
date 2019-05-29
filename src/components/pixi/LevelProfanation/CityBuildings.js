import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '3bg700', type: 'a', x: 0, y: -50 })) // big
    this.mains.push(this.addComponent(Building, { layer: '3bg600', type: 'b', x: 0, y: -50 }))
    this.mains.push(this.addComponent(Building, { layer: '3bg600', type: 'c', x: 0, y: -50 }))
    this.mains.push(this.addComponent(Building, { layer: '3bg500', type: 'd', x: 0, y: -50 }))
    this.mains.push(this.addComponent(Building, { layer: '3bg400', type: 'e', x: 0, y: -50 }))
    this.mains.push(this.addComponent(Building, { layer: '3bg400', type: 'f', x: 0, y: -50 }))
    this.mains.push(this.addComponent(Building, { layer: '3bg300', type: 'i', x: 350, y: 100, scale: 0.7 }))
    this.mains.push(this.addComponent(Building, { layer: '3bg200', type: 'k', x: -450, y: 150, scale: 0.7 }))
    this.mains.push(this.addComponent(Building, { layer: '3bg100', type: 'l', x: -350, y: 80, scale: 0.7 }))
    this.mains.push(this.addComponent(Building, { layer: '3bg300', type: 'n', x: 0, y: -150, scale: 0.7 }))
    this.mains.push(this.addComponent(Building, { layer: '3bg300', type: 'o', x: -600, y: -250, scale: 0.7 }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
