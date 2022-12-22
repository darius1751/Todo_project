import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStateDto } from './dto/create-state.dto';
import { State } from './entities/state.entity';

@Injectable()
export class StateService {
  
  constructor(@InjectRepository(State) private stateRepository:Repository<State>){}
  
  create(createStateDto: CreateStateDto) {
    try{
      return this.stateRepository.save(createStateDto);
    }catch(exception){
      throw new InternalServerErrorException(exception);
    }
    
  }

  findAll() {
    return this.stateRepository.find({
      order:{
        order:'ASC'
      }
    });
  }

  async findOne(id: string) {
    
    const state = await this.stateRepository.findOneBy({id});
    if(state)
      return state;
    throw new BadRequestException(`Not exist state with id: ${id}`);
    
  }

}
