import React from 'react'
import { render } from 'react-dom'
import App from './App'

import './styles/bootstrap.global.scss'
import './index.scss'

const Element = React.createElement(App)

render(Element, document.getElementById('app'))
