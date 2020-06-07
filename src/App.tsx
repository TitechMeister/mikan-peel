import React, { useMemo } from 'react'
import { Route, useLocation, matchPath } from 'react-router-dom'
import c from 'classnames'
import TopBar from './components/nav/TopBar'
import PrivateRoute from './components/common/PrivateRoute'
import { useAuth } from './utils/auth'

import HomeView from './views/HomeView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import RecoverView from './views/RecoverView'
import ResetPasswordView from './views/ResetPasswordView'
import LogoutView from './views/LogoutView'

import styles from './App.scss'
import AuthContext from './context/AuthContext'
import { useMikanApi } from './utils/mikanApi'
import MikanApiContext from './context/MikanApiContext'

const fullScreenPaths = ['/login', '/register', '/recover', '/recover/:token']

const App: React.FC = () => {
  const { pathname } = useLocation()
  const auth = useAuth()
  const mikanApi = useMikanApi({ token: auth?.token })
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
      <AuthContext.Provider value={auth}>
        <MikanApiContext.Provider value={mikanApi}>
          {!isFullScreen && <TopBar />}
          <div className={c({ [styles.fullscreen]: isFullScreen })}>
            <PrivateRoute exact={true} path='/' component={HomeView} />
            <Route exact={true} path='/login' component={LoginView} />
            <Route exact={true} path='/logout' component={LogoutView} />
            <Route exact={true} path='/register' component={RegisterView} />
            <Route exact={true} path='/recover' component={RecoverView} />
            <Route
              exact={true}
              path='/recover/:token'
              component={ResetPasswordView}
            />
          </div>
        </MikanApiContext.Provider>
      </AuthContext.Provider>
    </div>
  )
}

export default App
