import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '3bg800', type: 'c', x: 0, y: -50, scale: 0.66 })) // fond incrusté
    this.mains.push(this.addComponent(Building, { layer: '3bg700', type: 'b', x: -15, y: -70, scale: 0.66 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '3bg690', type: 'a', x: 0, y: -50, scale: 0.66 })) // big

    this.mains.push(this.addComponent(Building, { layer: '3bg600', type: 'd', x: 0, y: -20, scale: 0.66 })) // immeuble fond
    this.mains.push(this.addComponent(Building, { layer: '3bg600', type: 'e', x: 20, y: -50, scale: 0.66 })) // immeuble droite
    this.mains.push(this.addComponent(Building, { layer: '3bg600', type: 'f', x: -20, y: -50, scale: 0.66 })) // immeuble gauche
    this.mains.push(this.addComponent(Building, { layer: '3bg600', type: 'g', x: -180, y: 0, scale: 0.66 })) // puit
    this.mains.push(this.addComponent(Building, { layer: '3bg100', type: 'h', x: 65, y: -40, scale: 0.66 })) // bacshamp
    this.mains.push(this.addComponent(Building, { layer: '3f100', type: 'i', x: -50, y: 175, scale: 0.66 })) // tete
    this.mains.push(this.addComponent(Building, { layer: '3f200', type: 'j', x: -300, y: 130, scale: 0.66 })) // chien
    this.mains.push(this.addComponent(Building, { layer: '3bg600', type: 'k', x: -20, y: -90, scale: 0.66 })) // lampe
    this.mains.push(this.addComponent(Building, { layer: '3bg600', type: 'l', x: -350, y: -220, scale: 0.66 })) // vetement
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
