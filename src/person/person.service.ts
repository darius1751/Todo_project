import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {

  constructor(@InjectRepository(Person) private personRepository:Repository<Person>){}

  create(credentialId:string, createPersonDto: CreatePersonDto) {
    try{
      return this.personRepository.save({
        ...createPersonDto,
        credential:{
          id:credentialId
        }
    });
    }catch(exception){
      throw new InternalServerErrorException(`Revise log's ${exception}`);
    }
    
  }

  findAll() {
    return this.personRepository.find({
      select:{
        credential:{
          password:false,          
        }
      }
    });
  }

  async findOne(id: string) {
    const person:Person = await this.personRepository.findOneBy({id});
    if(person){
      const {credential} = person;
      const {username,id} = credential;
      return {
        ...person,
        credential:{
          id,
          username
        }
      };
    }
    throw new BadRequestException(`Not exist person with id: ${id}`);
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    await this.findOne(id)
    try{
      await this.personRepository.update({id},updatePersonDto);
      return await this.findOne(id);

    }catch(exception){
      throw new InternalServerErrorException(`Revise log's ${exception}`);
    }
    
  }
}
