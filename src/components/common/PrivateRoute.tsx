import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { RouteProps, Redirect } from 'react-router'
import AuthContext from '../../context/AuthContext'

type Props = RouteProps

const RedirectComponent: React.FC = () => <Redirect to='/login' />

const PrivateRoute: React.FC<Props> = (props: Props) => {
  const auth = useContext(AuthContext)

  if (auth?.authed) {
    return <Route {...props} />
  } else {
    const { path, exact, strict, sensitive } = props
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
