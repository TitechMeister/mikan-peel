'use strict'

import axios, { AxiosResponse } from 'axios'

export const baseURL = process.env.API_ENTRYPOINT || 'http://localhost:8000'

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    // 'Authorization': `Bearer ${token}`
  },
  withCredentials: false,
  responseType: 'json',
})

// format api path to be with trailing and leading '/'
const normalizeApiPath = (apiPath: string): string => {
  if (!apiPath.startsWith('/')) {
    apiPath = '/' + apiPath
  }
  if (!apiPath.endsWith('/')) {
    apiPath = apiPath + '/'
  }
  return apiPath
}

export const get = (apiPath: string, option = null): Promise<AxiosResponse> => {
  return instance.get(normalizeApiPath(apiPath), option)
}

export const post = (
  apiPath: string,
  data,
  option = null,
): Promise<AxiosResponse> => {
  return instance.post(normalizeApiPath(apiPath), data, option)
}

export const getWithoutDefaultHeader = (
  apiPath: string,
  option = null,
): Promise<AxiosResponse> => {
  const headers = instance.defaults.headers
  instance.defaults.headers = {}
  const promise = instance.get(normalizeApiPath(apiPath), option)
  instance.defaults.headers = headers
  return promise
}
export const postWithoutDefaultHeader = (
  apiPath: string,
  data,
  option = null,
): Promise<AxiosResponse> => {
  const headers = instance.defaults.headers
  instance.defaults.headers = {}
  const promise = instance.post(normalizeApiPath(apiPath), data, option)
  instance.defaults.headers = headers
  return promise
}

export const patch = (
  apiPath: string,
  data,
  option = null,
): Promise<AxiosResponse> => {
  return instance.patch(normalizeApiPath(apiPath), data, option)
}

export const setAuthToken = (token: string): void => {
  instance.defaults.headers['Authorization'] = `Bearer ${token}`
}

export const saveAuthToken = async (
  usernameOrEmail: string,
  password: string,
): Promise<string> => {
  const response = await instance.post('/auth/token/', {
    username_or_email: usernameOrEmail,
    password: password,
  })
  if (response.status === 200) {
    const token = response.data.token
    setAuthToken(token)
    return token
  }
}
