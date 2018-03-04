import * as api from '~/utils/mikan-api'

export const state = () => ({
  workplaces: [],
  // collection of work classified by workplace
  workInProgress: {}
})

export const mutations = {
  setWorkplaces (state, workplaces) {
    state.workplaces = workplaces
  },
  setWorkInProgress (state, workInProgress) {
    state.workInProgress = workInProgress
  },
}

export const actions = {
  async fetch ({ state, commit, dispatch }) {
    dispatch('fetchWorkplaces')
    dispatch('fetchWorkInProgress')
  },

  async fetchWorkplaces({ commit, rootState }) {
    if (!rootState.token) {
      commit('setWorkplaces', [])
      return
    }
    try{
      const newWorkplaces = (await api.get('/workplaces')).data
      commit('setWorkplaces', newWorkplaces)
    } catch (e) {
      console.error(e)
      return
    }
  },

  async fetchWorkInProgress ({ state, rootState, commit, dispatch }) {
    if (!rootState.token) {
      commit('setWorkInProgress', {})
      return
    }
    try{
      const unclassifiedWork = (await api.get('/work', {params: {in_progress: true}})).data

      // initialize new map
      const newWorkInProgress = {}
      for (let workplace of state.workplaces) {
        newWorkInProgress[workplace.id] = []
      }

      // insert work by workplace id
      for (let work of unclassifiedWork) {
        newWorkInProgress[work.workplace.id].push(work)
      }
      commit('setWorkInProgress', newWorkInProgress)
    } catch (e) {
      console.error(e)
      return
    }
  },

}

export const getters = {
}
