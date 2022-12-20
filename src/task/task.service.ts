import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonService } from 'src/person/person.service';
import { StateService } from 'src/state/state.service';
import { TypeService } from 'src/type/type.service';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task) private taskRepository:Repository<Task>,
    private personService:PersonService,
    private stateService:StateService,
    private typeService:TypeService
  ){}

  async create(createTaskDto: CreateTaskDto) {
    const {stateId, personId,typeId, ...task} = createTaskDto;
    await this.personService.findOne(personId);
    await this.stateService.findOne(stateId);
    await this.typeService.findOne(typeId);
    try{
      const dataInsert = {
        ...task,
        state:{
          id:stateId
        },
        type:{
          id: typeId
        },
        person:{
          id: personId
        }
      }
      if(!typeId)
        delete dataInsert.type;
      return await this.taskRepository.save(dataInsert);
    }catch(exception){
      console.log({exception})
      throw new InternalServerErrorException(`Revise log's ${exception}`);
    }
    
  }

  findAll() {
    return this.taskRepository.find({
      relations:{
        person:true,
        type:true,
        state:true
      }
    });
  }

  async findByPersonId(personId:string){
    await this.personService.findOne(personId);
    return await this.taskRepository.find({
      where:{ 
        person:{
        id:personId
      },
    },
    relations:{
      state:true,
      type:true
    }
  })
  }
  async findOne(id: string) {
    
    const task = await this.taskRepository.findOneBy({id});
    if(task)
      return task;
    throw new BadRequestException(`Not exist task with id: ${id}`);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);
    try{
      await this.taskRepository.update({id},updateTaskDto);
      return await this.findOne(id);
    }catch(exception){
      throw new BadRequestException(`Revise log's ${exception}`)
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try{
      return await this.taskRepository.delete({id});
    }catch(exception){
      throw new InternalServerErrorException(`Revise log's ${exception}`)
    }
  }
}
