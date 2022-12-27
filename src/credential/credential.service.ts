import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { Credential } from './entities/credential.entity';
import { compareSync, hashSync } from 'bcrypt';
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
        })

    }catch(exception){
      Logger.error(exception, CredentialService.name);
    }
    
  }
  
  async login(loginCredentialDto:LoginCredentialDto){
    const {password, username} = loginCredentialDto;
    const user = await this.findUserByUsername(username);
    if(compareSync(password, user.password))
      return {
        id:user.id
      }
    else
      throw new UnauthorizedException(`Error in credentials`);
  }

  private async findUserByUsername(username:string){
    const user = await this.credentialRepository.findOne({
      where:{
        username
      }
    })
    if(user)
      return user;
    else
      throw new BadRequestException(`Not exist username: ${username}`);
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
    return this.credentialRepository.update({id}, {
      ...updateCredentialDto,
      password: hashSync(updateCredentialDto.password,10)
    });
  }

  
}
