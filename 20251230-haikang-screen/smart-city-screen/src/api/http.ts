import axiosInstance from './axios'
import { RequestHttpEnum, ContentTypeEnum } from '@/enums/httpEnum'
import mockMethod from '@/api/mock/index'

// Helper to find mock
const findMock = (url: string, method: string) => {
  return mockMethod.find(m => m.url === url && m.method === method);
}

export const get = (url: string, params?: object) => {
  // Direct mock return in production to bypass network issues
  if (import.meta.env.PROD) {
    const mock = findMock(url, RequestHttpEnum.GET);
    if (mock) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return Promise.resolve((mock.response as any)({ body: params }));
    }
  }

  return axiosInstance({
    url: url,
    method: RequestHttpEnum.GET,
    params: params
  })
}

export const post = (url: string, data?: object, headersType?: string) => {
  if (import.meta.env.PROD) {
    const mock = findMock(url, RequestHttpEnum.POST);
    if (mock) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return Promise.resolve((mock.response as any)({ body: data }));
    }
  }

  return axiosInstance({
    url: url,
    method: RequestHttpEnum.POST,
    data: data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON
    }
  })
}

export const patch = (url: string, data?: object, headersType?: string) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.PATCH,
    data: data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON
    }
  })
}

export const put = (
  url: string,
  data?: object,
  headersType?: ContentTypeEnum
) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.PUT,
    data: data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON
    }
  })
}

export const del = (url: string, params?: object) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.DELETE,
    params
  })
}
