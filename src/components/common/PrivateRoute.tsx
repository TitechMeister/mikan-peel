import React from 'react'
import { Route } from 'react-router-dom'
import { RouteProps, Redirect } from 'react-router'
import type { Auth } from '../../utils/auth'

type Props = RouteProps & {
  auth: Auth
}

const RedirectComponent: React.FC = () => <Redirect to='/login' />

const PrivateRoute: React.FC<Props> = (props: Props) => {
  const { auth, ...others } = props

  if (auth.authed) {
    return <Route {...others} />
  } else {
    const { path, exact, strict, sensitive } = others
    return (
      <Route
        component={RedirectComponent}
        {...{
          path,
          exact,
          strict,
          sensitive,
        }}
      />
    )
  }
}

export default PrivateRoute
