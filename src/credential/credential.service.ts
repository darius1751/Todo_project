import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { Credential } from './entities/credential.entity';
import { hashSync } from 'bcrypt';
import { LoginCredentialDto } from './dto/login-credential.dto';
@Injectable()
export class CredentialService {
  constructor(@InjectRepository(Credential) private credentialRepository:Repository<Credential>){}
  
  create(createCredentialDto: CreateCredentialDto) {
    try{
      return this.credentialRepository.save(
        {
          ...createCredentialDto,
          password: hashSync(createCredentialDto.password, 10)
        });

    }catch(exception){
      Logger.error(exception, CredentialService.name)
    }
    
  }
  
  login(loginCredentialDto:LoginCredentialDto){
    return this.credentialRepository.findOne({
      where:{
        ...loginCredentialDto
      },
      select:{
        id:true
      }
    })
  }
  
  async findOne(id:string){
    const credential = await this.credentialRepository.findOneBy({id});
    if(credential)
      return credential;
    else 
      throw new BadRequestException(`Not exist credential with id: ${id}`);
  }

  async update(id: string, updateCredentialDto: UpdateCredentialDto) {
    await this.findOne(id);
    return this.credentialRepository.update({id}, updateCredentialDto);
  }

  
}
