import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import CreateTodoDto from './dto/create-todo.dto';
//import Todo from './entities/todo.entity';
import  {UpdateTodoDto}  from './dto/update-todo.dto'
import { TodosService } from './todo.service';
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // get all todos
  @Get()
  getTodos() {
    return this.todosService.getAllTodos();
  }

  // get todo by id
  @Get(':id')
  getTodoById(@Param('id') id: string) {
    return this.todosService.getTodoById(Null(id));
  }

  // create todo
  @Post()
  async createTodo(@Body() todo: CreateTodoDto) {
    return this.todosService.createTodo(todo);
  }

  // update todo
  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() todo: UpdateTodoDto) {
    return this.todosService.updateTodo(Null(id), todo);
  }

  //delete todo
  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    this.todosService.deleteTodo(Null(id));
  }
}

function Null(id: string): null {
  throw new Error('Function not implemented.');
}
