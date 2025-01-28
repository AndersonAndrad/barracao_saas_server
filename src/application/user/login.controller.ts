import { LoginDto } from '@app/core/dto/login/login.dto';
import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserLoginService } from './services/user-login.service';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: UserLoginService) { }

  @Post()
  login(@Body() loginObj: LoginDto) {
    return this.loginService.login(loginObj);
  }

  @Post('logout/:email')
  logout(@Query('email') email: string) {
    this.loginService.logout(email);
  }
}
