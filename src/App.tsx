import React, { useMemo } from 'react'
import { BrowserRouter, Route, useLocation, matchPath } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import c from 'classnames'
import TopBar from './components/common/TopBar'
import HomeView from './views/HomeView'
import LoginView from './views/LoginView'

import styles from './App.scss'

const fullScreenPaths = ['/login']

const App: React.FC = () => {
  const { pathname } = useLocation()
  const isFullScreen = useMemo(
    () =>
      fullScreenPaths.some(
        (path) =>
          !!matchPath(pathname, {
            path,
            exact: true,
          }),
      ),
    [pathname],
  )

  return (
    <div>
      {!isFullScreen && <TopBar />}
      <Container
        className={c({ [styles.fullscreen]: isFullScreen })}
        fluid={isFullScreen}
      >
        <Route exact={true} path='/' component={HomeView} />
        <Route exact={true} path='/login' component={LoginView} />
      </Container>
    </div>
  )
}

export default App
