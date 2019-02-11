import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { unregister } from './serviceWorker'
import './index.css'

const render = Component => {
    return ReactDOM.render(<Component />, document.getElementById('root'))
}

render(App)

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default
        render(NextApp)
    })
}

unregister()
