import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDTO } from './dto/create-todos.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(AuthGuard)
  @Post('/add')
  create(@Body() dto: CreateTodoDTO) {
    return this.todosService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Get('/all')
  findMany() {
    console.log('get all todos');
    return this.todosService.findMany();
  }

  @UseGuards(AuthGuard)
  @Get('/get/:id')
  findOne(@Param('id') id: number) {
    console.log('get one todos: ', id);
    return this.todosService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put('/update/:id')
  update(@Param('id') id: number, @Body() todoUpdate: CreateTodoDTO) {
    console.log('updaaaaaate: ', id);
    return this.todosService.update(id, todoUpdate);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.todosService.delete(id);
  }
}
