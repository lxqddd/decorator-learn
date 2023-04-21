import { PATH_METADATA } from './common'

export function Controller(router: string) {
  const defaultPath = '/'
  return function (target: object) {
    const path = router || defaultPath
    Reflect.defineMetadata(PATH_METADATA, path, target)
  }
}

export function Get(router: string) {
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target.constructor, router, propertyKey, descriptor.value)
  }
}
