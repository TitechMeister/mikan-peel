'use strict'

import * as axiosBase from 'axios'

export const baseURL = process.env.API_ENTRYPOINT || "http://localhost:8000"

const axios = axiosBase.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    // 'Authorization': 'Bearer ' + localStorage.mikanApiToken
  },
  withCredentials: false,
  responseType: 'json'
})

// format api path to be with trailing and leading '/'
function normalizeApiPath (apiPath) {
  if (!apiPath.startsWith('/')) {
    apiPath = '/' + apiPath
  }
  if (!apiPath.endsWith('/')) {
    apiPath = apiPath + '/'
  }
  return apiPath
}

export const get = (apiPath, option = null) => {
  return axios.get(normalizeApiPath(apiPath), option)
}

export const post = (apiPath, data, option = null) => {
  return axios.post(normalizeApiPath(apiPath), data, option)
}

export const getWithoutDefaultHeader = (apiPath, option = null) => {
  const headers = axios.defaults.headers
  axios.defaults.headers = {}
  const promise = axios.get(normalizeApiPath(apiPath), option)
  axios.defaults.headers = headers
  return promise
}
export const postWithoutDefaultHeader = (apiPath, data, option = null) => {
  const headers = axios.defaults.headers
  axios.defaults.headers = {}
  const promise = axios.post(normalizeApiPath(apiPath), data, option)
  axios.defaults.headers = headers
  return promise
}

export const patch = (apiPath, data, option = null) => {
  return axios.patch(normalizeApiPath(apiPath), data, option)
}

export const setAuthToken = (token) => {
  axios.defaults.headers['Authorization'] = 'Bearer ' + token
}

export const saveAuthToken = (username, password) => {
  return axios.post('/auth/token/', {
    username: username,
    password: password
  }).then(response => {
    if (response.status === 200) {
      const token = response.data.token
      setAuthToken(token)
      return token
    }
  })
}

