import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    // this.mains.push(this.addComponent(Building, { layer: '6bg600', x: 0, type: 'a', y: -50 }))
    // this.mains.push(this.addComponent(Building, { layer: '6bg500', x: -600, type: 'b', y: -80 }))
    // this.mains.push(this.addComponent(Building, { layer: '6bg500', x: 480, type: 'c', y: -80 }))
    // this.mains.push(this.addComponent(Building, { layer: '6bg400', x: -370, type: 'd', y: -50 }))
    // this.mains.push(this.addComponent(Building, { layer: '6bg300', x: -370, type: 'e', y: -250 }))
    // this.mains.push(this.addComponent(Building, { layer: '6bg300', x: 60, type: 'f', y: 50 }))
    // this.mains.push(this.addComponent(Building, { layer: '6bg200', x: 0, type: 'g', y: -200 }))
    // this.mains.push(this.addComponent(Building, { layer: '6bg100', x: -120, type: 'h', y: 50 }))
    // this.mains.push(this.addComponent(Building, { layer: '6bg100', x: 300, type: 'i', y: 0 }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
