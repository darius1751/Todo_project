import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('person')
export class PersonController {
  
  constructor(private readonly personService: PersonService) {}

  @Post(':credentialId')
  create(@Param('credentialId',ParseUUIDPipe) credentialId:string, @Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(credentialId, createPersonDto);
  }

  @Post('login/:credentialId')
  @HttpCode(200)
  findOneByCredentialId(@Param('credentialId', ParseUUIDPipe) id:string){
    return this.personService.findOneByCredentialId(id);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.personService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(id, updatePersonDto);
  }

}
