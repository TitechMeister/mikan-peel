import * as api from '~/utils/mikan-api.js'
import Cookies from 'js-cookie';

export const checkToken = async (token) => {
  if (!token) return false
  const response = await api.post('/auth/verify', { token: token })
  return response.status === 200
}

export const checkLogin = async ({ store }) => {
  try {
    const token = Cookies.get('mikan_token', token, { domain: `${document.domain}`})
    return await checkToken(token)
  } catch (e) {
    return false
  }
}
