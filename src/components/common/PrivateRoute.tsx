import React from 'react'
import { Route } from 'react-router-dom'
import { RouteProps, Redirect } from 'react-router'
import type { Auth } from '../../utils/auth'

type Props = RouteProps & {
  auth: Auth
}

const RedirectComponent: React.FC = () => <Redirect to='/login' />

const PrivateRoute: React.FC<Props> = (props: Props) => {
  const { auth, component, ...others } = props

  if (auth.authed) {
    return <Route component={component} {...others} />
  } else {
    return <Route component={RedirectComponent} {...others} />
  }
}

export default PrivateRoute
