import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '9cg400', x: 0, type: 'a', scale: 0.9, y: -50 })) // big
    this.mains.push(this.addComponent(Building, { layer: '9cg300', x: -440, type: 'b', scale: 0.9, y: -150 }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}