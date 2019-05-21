import PixiComponent from 'abstractions/PixiComponent'
import Light from "../LevelCommon/Light";

export default class LevelLight extends PixiComponent {
	setup () {
		this.mains = []
		this.mains.push(this.addComponent(Light, { layer: 'hero', form: 'light/main', target: this.base, x: 100, y: -100, tint: 0xff0000, alpha: 1, scale: [0.3, 0.27], animation: 'flamme' }))
	}

	componentWillUnmount () {
		this.mains = undefined
	}
}
