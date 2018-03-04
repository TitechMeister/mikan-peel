import * as api from '~/utils/mikan-api.js'

export const checkToken = async (token) => {
   const response = await api.post('/auth/verify', { token: token })
   return response.status === 200
}

export const checkLogin = async ({ store }) => {
  if (!store.state.token || store.state.token === "") {
    return false
  }
  checkToken(localStorage.mikanApiToken).catch( err => {
    return false
  })
  return true
}
