import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { LoginCredentialDto } from './dto/login-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';

@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Post()
  create(@Body() createCredentialDto: CreateCredentialDto) {
    return this.credentialService.create(createCredentialDto);
  }
  @Post('/login')
  login(@Body() loginCredentialDto:LoginCredentialDto){
    return this.credentialService.login(loginCredentialDto)
  }
  @Patch(':id')
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateCredentialDto: UpdateCredentialDto) {
    return this.credentialService.update(id, updateCredentialDto);
  }
  
}
