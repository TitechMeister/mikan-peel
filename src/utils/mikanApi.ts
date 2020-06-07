/* eslint-disable @typescript-eslint/no-explicit-any */

'use strict'
import { useMemo, useCallback } from 'react'
import axios from 'axios'
import type { AxiosResponse, AxiosRequestConfig } from 'axios'

export const baseURL = process.env.API_ENTRYPOINT || 'http://localhost:8000'

type MikanApiProps = {
  token?: string
}

type MikanApi = {
  get: (apiPath: string, option?: AxiosRequestConfig) => Promise<AxiosResponse>
  post: (
    apiPath: string,
    data?: any,
    option?: AxiosRequestConfig,
  ) => Promise<AxiosResponse>
  patch: (
    apiPath: string,
    data?: any,
    option?: AxiosRequestConfig,
  ) => Promise<AxiosResponse>
  getWithoutDefaultHeader: (
    apiPath: string,
    option?: AxiosRequestConfig,
  ) => Promise<AxiosResponse>
  postWithoutDefaultHeader: (
    apiPath: string,
    data?: any,
    option?: AxiosRequestConfig,
  ) => Promise<AxiosResponse>
  auth: (usernameOrEmail: string, password: string) => Promise<string>
}

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

const useMikanApi = ({ token }: MikanApiProps = {}): MikanApi => {
  const instance = useMemo(
    () =>
      axios.create({
        baseURL: baseURL,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: token && `Bearer ${token}`,
        },
        withCredentials: false,
        responseType: 'json',
      }),
    [token],
  )

  const get = useCallback(
    (
      apiPath: string,
      option: AxiosRequestConfig = null,
    ): Promise<AxiosResponse> => {
      return instance.get(normalizeApiPath(apiPath), option)
    },
    [instance],
  )

  const post = useCallback(
    (
      apiPath: string,
      data: any,
      option: AxiosRequestConfig = null,
    ): Promise<AxiosResponse> => {
      return instance.post(normalizeApiPath(apiPath), data, option)
    },
    [instance],
  )

  const patch = useCallback(
    (
      apiPath: string,
      data: any,
      option: AxiosRequestConfig = null,
    ): Promise<AxiosResponse> => {
      return instance.patch(normalizeApiPath(apiPath), data, option)
    },
    [instance],
  )

  const getWithoutDefaultHeader = useCallback(
    (
      apiPath: string,
      option: AxiosRequestConfig = null,
    ): Promise<AxiosResponse> => {
      const headers = instance.defaults.headers
      instance.defaults.headers = {}
      const promise = instance.get(normalizeApiPath(apiPath), option)
      instance.defaults.headers = headers
      return promise
    },
    [instance],
  )

  const postWithoutDefaultHeader = useCallback(
    (
      apiPath: string,
      data: any,
      option: AxiosRequestConfig = null,
    ): Promise<AxiosResponse> => {
      const headers = instance.defaults.headers
      instance.defaults.headers = {}
      const promise = instance.post(normalizeApiPath(apiPath), data, option)
      instance.defaults.headers = headers
      return promise
    },
    [instance],
  )

  const auth = useCallback(
    async (usernameOrEmail: string, password: string): Promise<string> => {
      const response = await post('/auth/token/', {
        username_or_email: usernameOrEmail,
        password: password,
      })

      if (response.status === 200) {
        const token = response.data.token
        instance.defaults.headers['Authorization'] = `Bearer ${token}` //一時的
        return token
      }

      return null
    },
    [instance],
  )

  return {
    get,
    post,
    patch,
    getWithoutDefaultHeader,
    postWithoutDefaultHeader,
    auth,
  }
}

export { useMikanApi }
export type { MikanApi }
