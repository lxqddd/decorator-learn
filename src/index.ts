// import 'reflect-metadata'
// import { Controller, Get, Params, Post } from './decorators'

// @Controller('user')
// class UserController {
//   constructor() {}
//   @Get('info')
//   getUserInfo(@Params('name') req?: string) {
//     console.log('get user info ', req)
//   }

//   @Post('info')
//   postUserInfo() {
//     console.log('post user info')
//   }
// }

// @Controller('article')
// class ArticleController {
//   constructor() { }

//   @Get('detail')
//   getArticleDetail() {

//   }
// }

// const userController = new UserController()
// userController.getUserInfo()
// // Array.from(globalControllerMap.keys()).forEach((item) => {
// //   Array.from(globalRouteMap.values()).forEach((routes) => {
// //     if (routes.target === item) {
// //       const router = globalRouterMap.get(item)?.router || []
// //       router.push({
// //         path: routes.path,
// //         target: routes.fn,
// //         method: routes.method
// //       })
// //       globalRouterMap.set(item, {
// //         controller: globalControllerMap.get(item) || '',
// //         router
// //       })
// //     }
// //   })
// // })

// // Array.from(globalRouterMap.keys()).forEach((item) => {
// //   console.log(globalRouterMap.get(item))
// // })

import 'reflect-metadata'

// const META_KEY = Symbol('my-metadata-key')

const CONTROLLER_METADATA = '__controller__'
const METHOD_METADATA = '__method__'
const PARAM_METADATA = '__param__'

function Controller(path: string) {
  return function (target: Object) {
    Reflect.defineMetadata(CONTROLLER_METADATA, path, target)
  }
}

function Get(route: string) {
  return function (target: Object, methodKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(METHOD_METADATA, route, target.constructor)
  }
}

function Param(target: Object, propertyKey: string, paramsIndex: number) {
  Reflect.defineMetadata(PARAM_METADATA, 'hello this is params', target, propertyKey)
}

@Controller('user')
class UserController {
  @Get('info')
  getUserInfo(@Param req: string) {
    // const metadata = Reflect.getMetadata(PARAM_METADATA, this, 'getUserInfo')
    // console.log('hello world', metadata, this)
    console.log(req, '==============')
  }
}

const user = new UserController()

const params = Reflect.getMetadata(PARAM_METADATA, user, 'getUserInfo')
console.log(params)

user.getUserInfo(params)

const keys = Reflect.getMetadataKeys(UserController)

keys.forEach((key) => {
  const value = Reflect.getMetadata(key, UserController)

  console.log(`Metadata key: ${key.toString()}, value: ${value}`)
})
