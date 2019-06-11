import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'
import Glass from 'components/pixi/LevelCommon/Glass'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    // real
    // this.mains.push(this.addComponent(Building, { layer: '1bg500', type: 'a', x: 0, y: -50 })) // big
    // this.mains.push(this.addComponent(Building, { layer: '1bg400', type: 'b', x: -50, y: -150 }))
    // this.mains.push(this.addComponent(Building, { layer: '1bg300', type: 'c', x: -350, y: -100 }))
    // this.mains.push(this.addComponent(Building, { layer: '1bg300', type: 'd', x: -150, y: -100 }))
    // this.mains.push(this.addComponent(Building, { layer: '1bg200', type: 'e', x: 250, y: 50 }))
    // this.mains.push(this.addComponent(Building, { layer: '1bg200', type: 'f', x: 550, y: 0 }))
    // this.mains.push(this.addComponent(Building, { layer: '1bg100', type: 'g', x: -450, y: 0 }))
    // this.mains.push(this.addComponent(Light, { layer: '1bg200', form: 'light/main', target: this.base, x: 0, y: -63, tint: 0x886600, alpha: 1, scale: [0.3, 0.27] }))

    // bashamp  3bg..
    // this.mains.push(this.addComponent(Building, { layer: '0bg800', type: 'c', x: -20, y: -50, scale: 1.3 })) // fond incrusté
    this.mains.push(this.addComponent(Building, { layer: '0bg700', type: 'czz', x: -650, y: -450, scale: 0.65 })) // fond incrusté
    this.mains.push(this.addComponent(Building, { layer: '0bg700', type: 'b', x: -15, y: -70, scale: 1.3 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '0bg700', type: 'a', x: 0, y: -50, scale: 1.3 })) // big

    this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'd', x: 0, y: -20, scale: 1.3 })) // immeuble fond
    this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'e', x: 20, y: -50, scale: 1.3 })) // immeuble droite
    this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'f', x: -20, y: -50, scale: 1.3 })) // immeuble gauche
    this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'g', x: -180, y: 0, scale: 1.3 })) // puit
    this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'h', x: 65, y: -50, scale: 1.3 })) // bacshamp
    this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'i', x: -100, y: 150, scale: 1.3 })) // tete
    this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'j', x: -300, y: 90, scale: 1.3 })) // chien
    this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'k', x: -20, y: -90, scale: 1.3 })) // lampe
    this.mains.push(this.addComponent(Building, { layer: '0bg600', type: 'l', x: -350, y: -220, scale: 1.3 })) // vetement
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}
