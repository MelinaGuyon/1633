import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {

    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '7bg400', x: 0, type: 'a', scale: 0.9, y: -50 })) // big
    this.mains.push(this.addComponent(Building, { layer: '7bg300', x: -440, type: 'b', scale: 0.9, y: -150 }))
    this.mains.push(this.addComponent(Building, { layer: '7bg200', x: -220, type: 'c', scale: 0.9, y: -50 }))
    this.mains.push(this.addComponent(Building, { layer: '7bg200', x: 300, type: 'd', scale: 0.9, y: -50 }))
    this.mains.push(this.addComponent(Building, { layer: '7bg200', x: 300, type: 'e', scale: 0.9 }))
    this.mains.push(this.addComponent(Building, { layer: '7bg100', x: 300, type: 'f', scale: 0.9, y: 50 }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
