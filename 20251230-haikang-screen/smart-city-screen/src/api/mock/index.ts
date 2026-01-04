import { MockMethod } from 'vite-plugin-mock'
import { RequestHttpEnum, ResultEnum } from '@/enums/httpEnum'
import leftPageData from './leftPageData'
import centerPageData from './centerPageData'
import rightPageData from './rightPageData'
import securityPageData from './securityPageData'
import videoPageData from './videoPageData'
import ecologyPageData from './ecologyPageData'

export const leftPageDataApi = '/api/leftPageData'
export const centerPageDataApi = '/api/centerPageData'
export const rightPageDataApi = '/api/rightPageData'
export const securityPageDataApi = '/api/securityPageData'
export const videoPageDataApi = '/api/videoPageData'
export const ecologyPageDataApi = '/api/ecologyPageData'

const successObject = (data: unknown) => {
  return {
    code: ResultEnum.SUCCESS,
    msg: '请求成功',
    data
  }
}

const mockMethod: MockMethod[] = [
  {
    url: leftPageDataApi,
    method: RequestHttpEnum.GET,
    response: () => successObject(leftPageData)
  },
  {
    url: centerPageDataApi,
    method: RequestHttpEnum.GET,
    response: () => successObject(centerPageData)
  },
  {
    url: rightPageDataApi,
    method: RequestHttpEnum.GET,
    response: () => successObject(rightPageData)
  },
  {
    url: securityPageDataApi,
    method: RequestHttpEnum.GET,
    response: () => successObject(securityPageData)
  },
  {
    url: videoPageDataApi,
    method: RequestHttpEnum.GET,
    response: () => successObject(videoPageData)
  },
  {
    url: ecologyPageDataApi,
    method: RequestHttpEnum.GET,
    response: () => successObject(ecologyPageData)
  }
]

export default mockMethod
