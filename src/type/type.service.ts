import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';

@Injectable()
export class TypeService {
  
  constructor(@InjectRepository(Type) private typeRepository:Repository<Type>){}
  
  create(createTypeDto: CreateTypeDto) {
    try{
      return this.typeRepository.save(createTypeDto);
    }catch(exception){
      throw new BadRequestException(`Name type exist in db`);
    }
  }

  findAll() {
    return this.typeRepository.find();
  }

  async findOne(id: string) {
    
      const type = await this.typeRepository.findOneBy({id});
      if(type)
        return type;
      throw new BadRequestException(`Not exist type with id: ${id}`);
    
  }

  async update(id: string, updateTypeDto: UpdateTypeDto) {
    await this.findOne(id);
    try{
      await this.typeRepository.update({id},updateTypeDto);
      return await this.findOne(id);
    }catch(exception){
      throw new InternalServerErrorException(`View the log's ${exception}`);
    }
  }
  
}
