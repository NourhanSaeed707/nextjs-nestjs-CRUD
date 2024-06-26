import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne(username);
    console.log('fooooooooound user in singIn function');
    console.log(user);
    if (user === null) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    if (user && user.password !== password) {
      console.log('condition throw');
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: user.username };
    return {
      accessToken: await this.jwtService.sign(payload),
    };
  }

  async getAccount(userId: number): Promise<CreateUserDto | undefined> {
    const userDTO: CreateUserDto = await this.usersService.findById(userId);
    if (!userDTO) {
      return;
    }
    return userDTO;
  }
}
