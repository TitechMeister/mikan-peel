import * as api from '../utils/mikan-api.js'
import Cookies from 'js-cookie';

export const state = () => ({
  authed: false,
  token: "",
})

export const mutations = {
  setToken (state, { token }) {
    state.token = token
    api.setAuthToken(token)
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
    commit('setToken', {token: localStorage.mikanApiToken})
    dispatch('fetch')
  },

  logout ({ commit, dispatch }) {
    commit('unauthenticate')
    dispatch('updateToken', {token: ''})
  },

  async updateToken ({ commit, dispatch }, { token }) {
    localStorage.mikanApiToken = token
    Cookies.set('mikan_token', token, { domain: `${document.domain}`, secure: true })
    commit('setToken', {token})
    await dispatch('fetch')
  },

  async fetchToken ({ commit, dispatch }, { username, password }) {
    try {
      const token = await api.saveAuthToken(username, password)
      dispatch('updateToken', {token})
    }
    catch (e) {
      console.log(e)
    }
  },
}

export const getters = () => ({
})
