import * as api from '../utils/mikan-api.js'
import moment from 'moment'

export const state = () => ({
  // properties from django api are snake-cased
  id: null,
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  team: '',
  felica_idm: '',
  profile_image: '',

  currentWork: null
})

export const mutations = {
  clear (state) {
    state.id = null,
    state.username = '',
    state.email = '',
    state.first_name = '',
    state.last_name = '',
    state.team = '',
    state.felica_idm = '',
    state.profile_image = '',
    state.currentWork = null
  },
  setAccount (state, account) {
    for (let property in account) {
      state[property] = account[property]
    }
  },
  setCurrentWork (state, work) {
    state.currentWork = work
  },
}

export const actions = {
  async fetch({ commit, dispatch, rootState }) {
    if (!rootState.token) {
      commit('clear')
      return
    }
    await dispatch('fetchAccount')
    await dispatch('fetchCurrentWork')
  },

  async fetchAccount({ commit, rootState }) {
    if (!rootState.token) return
    commit('setAccount', (await api.get('/account')).data)
  },

  async fetchCurrentWork({ commit, state, rootState}) {
    if (!rootState.token) return

    // requires account informations have been fetched
    const apiParams = {in_progress: true, member: state.id}
    const currentWork = (await api.get('/work', { params: apiParams })).data[0] || null

    commit('setCurrentWork', currentWork)
  },

  async createWorkForAccount ({ commit, dispatch }, { workplace, start_at, end_at }) {
    // [TODO] Fix hard coding of time format
    const startTime = start_at || moment().format("YYYY-MM-DDTHH:mm")
    try {
      await api.post('work', { workplace, start_at: startTime, end_at: null })
      dispatch('fetchCurrentWork')
    } catch (e) {
      console.error(e)
      return
    }
  },

  async finishWorkForAccount ({ state, commit, dispatch }) {
    const endTime = moment().format("YYYY-MM-DDTHH:mm")
    try {
      await api.patch(`work/${state.currentWork.id}`, { end_at: endTime })
      dispatch('fetchCurrentWork')
    } catch (e) {
      console.error(e)
      return
    }
  }
}

export const getters = {
  profileImgUrl: state => state.profile_image ? state.profile_image : '',
  fullname: state => `${state.first_name} ${state.last_name}`
}
