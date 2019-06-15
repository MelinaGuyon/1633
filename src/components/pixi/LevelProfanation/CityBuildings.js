import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '3bg800', type: 'a', x: 0, y: -60, scale: 0.66 })) // big
    this.mains.push(this.addComponent(Building, { layer: '3bg700', type: 'c', x: 0, y: -55, scale: 0.66 })) // incrustation
    this.mains.push(this.addComponent(Building, { layer: '3bg690', type: 'b', x: 0, y: -50, scale: 0.66 })) // big

    // this.mains.push(this.addComponent(Building, { layer: '3bg600', type: 'd', x: -400, y: -370, scale: 0.66 })) // immeuble fond
    // this.mains.push(this.addComponent(Building, { layer: '3bg600', type: 'e', x: -450, y: -400, scale: 0.66 })) // immeuble droite
    // this.mains.push(this.addComponent(Building, { layer: '3bg600', type: 'f', x: -420, y: -300, scale: 0.66 })) // immeuble gauche
    // this.mains.push(this.addComponent(Building, { layer: '3bg600', type: 'g', x: -150, y: -250, scale: 0.6 })) // puit
    // this.mains.push(this.addComponent(Building, { layer: '3bg100', type: 'h', x: -410, y: -390, scale: 0.66 })) // bacshamp
    // this.mains.push(this.addComponent(Building, { layer: '3f100', type: 'i', x: 50, y: 140, scale: 0.66 })) // tete
    // this.mains.push(this.addComponent(Building, { layer: '3f200', type: 'j', x: -250, y: 30, scale: 0.66 })) // chien
    // this.mains.push(this.addComponent(Building, { layer: '3bg600', type: 'k', x: -350, y: -350, scale: 0.66 })) // lampe
    // this.mains.push(this.addComponent(Building, { layer: '3bg600', type: 'l', x: -300, y: -320, scale: 0.66 })) // vetement
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
