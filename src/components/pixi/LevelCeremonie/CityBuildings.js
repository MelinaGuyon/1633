import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '8bg600', x: 0, type: 'a', scale: 0.9, y: -50 })) // big
    this.mains.push(this.addComponent(Building, { layer: '8bg500', x: 0, type: 'b', scale: 0.9, y: -50 }))
    this.mains.push(this.addComponent(Building, { layer: '8bg400', x: 120, type: 'c', scale: 0.9, y: -50 }))
    this.mains.push(this.addComponent(Building, { layer: '8bg400', x: -280, type: 'd', scale: 0.9, y: -50 }))
    this.mains.push(this.addComponent(Building, { layer: '8bg400', x: -130, type: 'e', scale: 0.9, y: -80 }))
    this.mains.push(this.addComponent(Building, { layer: '8bg400', x: -520, type: 'f', scale: 0.9, y: 40 }))
    this.mains.push(this.addComponent(Building, { layer: '8bg300', x: 470, type: 'g', scale: 0.9, y: 0 }))
    this.mains.push(this.addComponent(Building, { layer: '8bg300', x: -410, type: 'h', scale: 0.9, y: 100 }))
    this.mains.push(this.addComponent(Building, { layer: '8bg200', x: 350, type: 'i', scale: 0.9, y: 120 }))
    this.mains.push(this.addComponent(Building, { layer: '8bg100', x: 120, type: 'j', scale: 0.9, y: 140 }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
