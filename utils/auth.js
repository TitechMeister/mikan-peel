import * as api from '~/utils/mikan-api.js'

export const checkToken = async (token) => {
  if (!token) return false
  const response = await api.post('/auth/verify', { token: token })
  return response.status === 200
}

export const checkLogin = async ({ store }) => {
  try {
    return await checkToken(localStorage.mikanApiToken)
  } catch (e) {
    return false
  }
}
