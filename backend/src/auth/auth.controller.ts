import { AuthGuard } from './auth.guard';
import { SignInDTO } from './auth.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO.username, signInDTO.password);
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  @Get('/validate-token')
  @UseGuards(AuthGuard)
  async getAccount(@Req() req: Request): Promise<CreateUserDto> {
    const user: any = req.user;
    console.log('geeeeeeeet user in validate token:');
    console.log(user);
    const userProfileFound = await this.authService.getAccount(user.id);
    return userProfileFound;
  }

  @Post('/authenticate')
  async authorize(
    @Req() req: Request,
    @Body() user: SignInDTO,
    @Res() res: Response,
  ): Promise<any> {
    const jwt = await this.authService.signIn(user.username, user.password);
    console.log('insiiiiide authenticate jwt: ', jwt);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.json(jwt);
  }
}
