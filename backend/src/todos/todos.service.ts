import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todos.entity';
import { Repository } from 'typeorm';
import { CreateTodoDTO } from './dto/create-todos.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(dto: CreateTodoDTO) {
    const todo = this.todoRepository.create(dto);
    return await this.todoRepository.save(todo);
  }

  async findMany() {
    return await this.todoRepository.find({});
  }

  async findOne(id: number) {
    return await this.todoRepository.findOne({ where: { id } });
  }

  async update(id: number, todoUpdate: CreateTodoDTO) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (todo) {
      Object.assign(todo, todoUpdate);
      return await this.todoRepository.save(todo);
    }
  }

  async delete(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (todo) {
      return await this.todoRepository.delete(id);
    }
  }
}
