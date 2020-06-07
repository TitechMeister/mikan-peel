import React, { useMemo } from 'react'
import { BrowserRouter, Route, useLocation, matchPath } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import c from 'classnames'
import TopBar from './components/common/TopBar'
import HomeView from './views/HomeView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'

import styles from './App.scss'

const fullScreenPaths = ['/login', '/register']

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
    <div className={styles.self}>
      {!isFullScreen && <TopBar />}
      <div className={c({ [styles.fullscreen]: isFullScreen })}>
        <Route exact={true} path='/' component={HomeView} />
        <Route exact={true} path='/login' component={LoginView} />
        <Route exact={true} path='/register' component={RegisterView} />
      </div>
    </div>
  )
}

export default App
