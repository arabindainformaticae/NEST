import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateTodoDto from './dto/create-todo.dto';
import Todo from './entities/todo.entity';
import  {UpdateTodoDto}  from './dto/update-todo.dto'
import { string } from 'joi';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  // find all
  getAllTodos() {
    return this.todoRepository.find();
  }

  // find by id
  async getTodoById(id: null) {
    const todo = await this.todoRepository.findOne(id);
    if (todo) {
      return todo;
    }

    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  // create
  async createTodo(todo: CreateTodoDto) {
    const newTodo = await this.todoRepository.create(todo);
    await this.todoRepository.save(newTodo);

    return newTodo;
  }

  // update
  async updateTodo(id:null ,post: UpdateTodoDto) {
    await this.todoRepository.update(id, post);
    const updatedTodo = await this.todoRepository.findOne(id);
    if (updatedTodo) {
      return updatedTodo;
    }

    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  // delete
  async deleteTodo(id:null) {
    const deletedTodo = await this.todoRepository.delete(id);
    if (!deletedTodo.affected) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
  }
}