import React, { useMemo } from 'react'
import { Route, useLocation, matchPath } from 'react-router-dom'
import c from 'classnames'
import TopBar from './components/nav/TopBar'
import PrivateRoute from './components/common/PrivateRoute'
import HomeView from './views/HomeView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import RecoverView from './views/RecoverView'

import styles from './App.scss'
import { useAuth } from './utils/auth'

const fullScreenPaths = ['/login', '/register', '/recover']

const App: React.FC = () => {
  const { pathname } = useLocation()
  const auth = useAuth()
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
        <PrivateRoute auth={auth} exact={true} path='/' component={HomeView} />
        <Route exact={true} path='/login' component={LoginView} />
        <Route exact={true} path='/register' component={RegisterView} />
        <Route exact={true} path='/recover' component={RecoverView} />
      </div>
    </div>
  )
}

export default App
