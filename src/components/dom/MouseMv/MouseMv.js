import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'

import './MouseMv.styl'


export default class MouseMv extends DomComponent {
	template ({ base }) {
		return (
			<section class='mouse'>
				X
			</section>
		)
	}

	componentDidMount () {
	}
}
