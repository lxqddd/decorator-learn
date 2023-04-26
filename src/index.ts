import 'reflect-metadata'
import { Controller, Get, Post, globalControllerMap, globalRouteMap, globalRouterMap } from './decorators'

@Controller('user')
class UserController {
  constructor() {}
  @Get('info')
  getUserInfo() {
    console.log('get user info ')
  }

  @Post('info')
  postUserInfo() {
    console.log('post user info')
  }
}

Array.from(globalControllerMap.keys()).forEach((item) => {
  Array.from(globalRouteMap.values()).forEach((routes) => {
    if (routes.target === item) {
      const router = globalRouterMap.get(item)?.router || []
      router.push({
        path: routes.path,
        target: routes.fn,
        method: routes.method
      })
      globalRouterMap.set(item, {
        controller: globalControllerMap.get(item) || '',
        router
      })
    }
  })
})

Array.from(globalRouterMap.keys()).forEach((item) => {
  console.log(globalRouterMap.get(item))
})
