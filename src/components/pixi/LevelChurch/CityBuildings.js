import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '2bg700', type: 'a', x: 0, y: -50, scale: 0.8 })) // big
    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'b', x: 0, y: -50, scale: 0.8 }))
    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'c', x: 0, y: -50, scale: 0.8 }))
    this.mains.push(this.addComponent(Building, { layer: '2bg500', type: 'd', x: 0, y: -50, scale: 0.8 }))
    this.mains.push(this.addComponent(Building, { layer: '2bg400', type: 'e', x: 0, y: -50, scale: 0.8 }))
    this.mains.push(this.addComponent(Building, { layer: '2bg400', type: 'f', x: 0, y: -50, scale: 0.8 }))
    this.mains.push(this.addComponent(Building, { layer: '2bg300', type: 'g', x: 0, y: 50, scale: 0.5 }))
    this.mains.push(this.addComponent(Building, { layer: '2bg300', type: 'h', x: 130, y: 100, scale: 0.5 }))
    this.mains.push(this.addComponent(Building, { layer: '2bg300', type: 'i', x: -200, y: 100, scale: 0.5 }))
    this.mains.push(this.addComponent(Building, { layer: '2bg200', type: 'j', x: -530, y: 50, scale: 0.5 }))
    this.mains.push(this.addComponent(Building, { layer: '2bg100', type: 'k', x: 450, y: 150, scale: 0.5 }))
    this.mains.push(this.addComponent(Building, { layer: '2bg200', type: 'l', x: 550, y: 50, scale: 0.5 }))
    this.mains.push(this.addComponent(Building, { layer: '2bg300', type: 'm', x: 0, y: 220, scale: 0.5 }))
    this.mains.push(this.addComponent(Building, { layer: '2bg300', type: 'n', x: 0, y: -150, scale: 0.5 }))
    this.mains.push(this.addComponent(Building, { layer: '2bg300', type: 'o', x: -600, y: -250, scale: 0.5 }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
