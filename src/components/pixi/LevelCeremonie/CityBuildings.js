import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '8bg800', type: 'a', x: 0, y: -60, scale: 0.66 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '8bg700', type: 'c', x: 0, y: -55, scale: 0.66 })) // incrustation
    this.mains.push(this.addComponent(Building, { layer: '8bg690', type: 'b', x: 0, y: -50, scale: 0.66 })) // fond

    this.mains.push(this.addComponent(Building, { layer: '8bg600', type: 'd', x: 200, y: -190, scale: 0.66 })) // village
    this.mains.push(this.addComponent(Building, { layer: '8bg600', type: 'e', x: 410, y: -240, scale: 0.66 })) // nuage droite
    this.mains.push(this.addComponent(Building, { layer: '8bg600', type: 'f', x: -440, y: -260, scale: 0.66 })) // nuage gauche
    this.mains.push(this.addComponent(Building, { layer: '8bg600', type: 'g', x: 130, y: -300, scale: 0.66 })) // nuage centre
    this.mains.push(this.addComponent(Building, { layer: '8bg600', type: 'h', x: -70, y: -305, scale: 0.66 })) // nuage centre guache

    // this.mains.push(this.addComponent(Building, { layer: '8bg500', type: 'i', x: -200, y: -120, scale: 0.63 })) // mec sceptre
    this.mains.push(this.addComponent(Building, { layer: '8bg500', type: 'j', x: -325, y: -105, scale: 0.63 })) // mec livre
    this.mains.push(this.addComponent(Building, { layer: '8bg500', type: 'k', x: 5, y: -100, scale: 0.63 })) // mec porte tete

    // this.mains.push(this.addComponent(Building, { layer: '8bg400', type: 'l', x: 480, y: -70, scale: 0.66 })) // roi
    this.mains.push(this.addComponent(Building, { layer: '8f100', type: 'm', x: 210, y: 90, scale: 0.66 })) // femme droite
    this.mains.push(this.addComponent(Building, { layer: '8bg300', type: 'n', x: 350, y: 65, scale: 0.66 })) // mec droite

    this.mains.push(this.addComponent(Building, { layer: '8f200', type: 'o', x: -410, y: 90, scale: 0.66 })) // femme gauche
    this.mains.push(this.addComponent(Building, { layer: '8bg300', type: 'p', x: -535, y: 20, scale: 0.66 })) // mec gauche
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
