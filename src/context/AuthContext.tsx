import React from 'react'
import type { Auth } from '../utils/auth'

const AuthContext = React.createContext<Auth>(null)

export default AuthContext
