import 'style/common.styl'

import { h, render } from '@internet/dom'
import App from 'components/dom/App/App'

// Do not use grpd in Arcade mode

render(<App base={document.body.querySelector('.app')} />)
