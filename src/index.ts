import 'reflect-metadata'
import { Controller, Get } from './decorators'

@Controller('user')
class UserController {
  constructor() {}
  @Get('info')
  getUserInfo() {}
}

const user = new UserController()

user.getUserInfo()
