import 'style/common.styl'

import { h, render } from '@internet/dom'
import Main from 'abstractions/Main'
import App from 'components/dom/App/App'
import Resize from 'utils/resize'
import logger from 'utils/logger'

window.onload = () => {
  const main = new Main()
  main
    .use(Resize)
    .start(() => {
      logger('App', '#47b342').log('setup succes')
      render(<App base={document.body.querySelector('.app')} />)
    })
}
