import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.createdAt = new Date();
    await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.findAndCount();
  }

  async findOne(username: string): Promise<User | undefined> {
    console.log('useernaame:');
    console.log(username);
    const user: User = await this.userRepository.findOne({
      where: { username },
    });
    console.log('usseer from found one');
    console.log(user);
    // console.log(user.id);
    if (user === null) {
      console.log('insiiide condition null');
      return null;
    }
    return user;
  }

  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({ where: { id } });
    userFound.username = updateUserDto.username;
    userFound.name = updateUserDto.name;
    userFound.password = updateUserDto.password;
    await this.userRepository.save(userFound);
  }

  async remove(id: number) {
    const userFound = await this.userRepository.findOne({ where: { id } });
    if (userFound) {
      return this.userRepository.delete(id);
    }
  }
}
