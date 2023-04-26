import { PATH_METADATA } from './common'
import { RequestMethod } from './types'
import type { RequestMappingMetadata } from './types'

const defaultMetadata: RequestMappingMetadata = {
  [PATH_METADATA]: '/',
  method: RequestMethod.GET
}

export const globalRouterMap: Map<object, {
  controller: string
  router?: {
    path: string
    target: Function
    method: RequestMethod
  }[]
}> = new Map()

export const globalControllerMap: Map<object, string> = new Map()
export const globalRouteMap: Map<Function, {
  path: string
  target: object
  method: RequestMethod
  fn: Function
}> = new Map()

export function Controller(router: string) {
  const defaultPath = '/'
  return function (target: object) {
    const path = router || defaultPath
    globalControllerMap.set(target, path)
  }
}

function requestMapping(metadata: RequestMappingMetadata = defaultMetadata) {
  const path = metadata.path || '/'
  const requestMethod = metadata.method || RequestMethod.GET
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    // console.log('aaa', metadata, descriptor.value)
    globalRouteMap.set(descriptor.value, {
      path,
      target: target.constructor,
      method: requestMethod,
      fn: descriptor.value
    })
    // console.log(globalRouteMap)
    return descriptor
  }
}

export function createMappingDecorator(requestMethod: RequestMethod) {
  return function (routerPath?: string) {
    return requestMapping({
      path: routerPath,
      method: requestMethod
    })
  }
}

export const Get = createMappingDecorator(RequestMethod.GET)
export const Post = createMappingDecorator(RequestMethod.POST)
export const Delete = createMappingDecorator(RequestMethod.DELETE)
export const Put = createMappingDecorator(RequestMethod.PUT)
export const Options = createMappingDecorator(RequestMethod.OPTIONS)
