import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import TopBar from './components/common/TopBar'
import HomeView from './views/HomeView'

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div>
          <TopBar />
          <Container>
            <Route exact={true} path='/' component={HomeView} />
          </Container>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default App
