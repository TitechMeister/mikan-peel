import * as api from '../utils/mikan-api.js'
import Cookies from 'js-cookie';

export const state = () => ({
  authed: false,
  token: "",
  query: {},
})

export const mutations = {
  setToken (state, { token }) {
    state.token = token
    api.setAuthToken(token)
  },
  setQuery (state, { query }) {
    state.query = query
  },
  authenticate (state) { state.authed = true },
  unauthenticate (state) { state.authed = false },
}

export const actions = {
  async fetch ({ commit, dispatch }) {
    dispatch('account/fetch')
    dispatch('work/fetch')
  },

  nuxtClientInit ({ commit, dispatch }, context) {
    const token = Cookies.get('mikan_token', token, { domain: `${document.domain}`})
    commit('setToken', { token })
    dispatch('fetch')
  },

  logout ({ commit, dispatch }) {
    commit('unauthenticate')
    dispatch('updateToken', {token: ''})
  },

  async updateToken ({ commit, dispatch }, { token }) {
    Cookies.set('mikan_token', token, { domain: `${document.domain}`, secure: true })
    commit('setToken', { token })
    await dispatch('fetch')
  },

  async fetchToken ({ commit, dispatch }, { username, password }) {
    const token = await api.saveAuthToken(username, password)
    dispatch('updateToken', { token })
  },
}

export const getters = () => ({
})
