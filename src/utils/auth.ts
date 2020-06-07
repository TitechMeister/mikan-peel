import { useState, useCallback, useMemo } from 'react'
import Cookies from 'js-cookie'
import { useMikanApi } from './mikanApi'

type Account = {
  id: string
  uid: string
  username: string
  email: string
  first_name: string
  last_name: string
  ja_first_name: string
  ja_last_name: string
  team: {
    id: number
    name: string
    section: number
  }
  profile_image: string
  executive_generation: number
  is_active: string
  is_staff: string
}

type Auth = {
  authed: boolean
  token: string
  account: Account
  init: () => void
  login: (usernameOrEmail: string, password: string) => Promise<boolean>
  logout: () => void
}

const useAuth = (): Auth => {
  const [authed, setAuthed] = useState<boolean>(false)
  const [token, setToken] = useState<string>(null)
  const [account, setAccount] = useState(null)
  const mikanApi = useMikanApi({ token })

  const init = useCallback(() => {
    const token = Cookies.get('mikan_token', {
      domain: `${document.domain}`,
    })
    setToken(token)
  }, [setToken])

  const fetchAccount = useCallback(async () => {
    const account = (await mikanApi.get('/account')).data
    setAccount(account)
  }, [mikanApi.get, setAccount])

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
        const token = await mikanApi.auth(usernameOrEmail, password)
        await fetchAccount()
        setAuthed(!!token)
        updateToken(token)
        return !!token
      } catch (e) {
        setAuthed(false)
        updateToken(null)
        console.log(e)
        return false
      }
    },
    [setAuthed, setToken, fetchAccount, mikanApi.auth],
  )

  const logout = useCallback(() => {
    setAuthed(false)
    updateToken(null)
  }, [setAuthed, setToken])

  return {
    authed,
    token,
    account,
    init,
    login,
    logout,
  }
}

export { useAuth }
export type { Auth }
