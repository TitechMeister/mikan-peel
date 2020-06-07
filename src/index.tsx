import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import './styles/bootstrap.global.scss'
import './index.scss'

const Index: React.FC = () => (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

render(React.createElement(Index), document.getElementById('app'))
