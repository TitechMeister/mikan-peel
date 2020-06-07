import { useState, useCallback } from 'react'
import { saveAuthToken } from './mikanApi'
import Cookies from 'js-cookie'

type Auth = {
  authed: boolean
  token: string
  init: () => void
  login: (usernameOrEmail: string, password: string) => Promise<boolean>
  logout: () => void
}

const useAuth = (): Auth => {
  const [authed, setAuthed] = useState<boolean>(false)
  const [token, setToken] = useState<string>(null)

  const init = useCallback(() => {
    const token = Cookies.get('mikan_token', {
      domain: `${document.domain}`,
    })
    setToken(token)
  }, [setToken])

  const updateToken = useCallback(
    (token: string) => {
      setToken(token)
      Cookies.set('mikan_token', token || '', {
        domain: `${document.domain}`,
        secure: true,
      })
    },
    [setToken],
  )

  const login = useCallback(
    async (usernameOrEmail: string, password: string) => {
      try {
        const token = await saveAuthToken(usernameOrEmail, password)
        setAuthed(!!token)
        updateToken(token)
        return !!token
      } catch (e) {
        setAuthed(false)
        updateToken(null)
        return false
      }
    },
    [setAuthed, setToken],
  )

  const logout = useCallback(() => {
    setAuthed(false)
    updateToken(null)
  }, [setAuthed, setToken])

  return {
    authed,
    token,
    init,
    login,
    logout,
  }
}

export { useAuth }
export type { Auth }
