import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { CredentialModule } from 'src/credential/credential.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Person]),
    CredentialModule
  ],
  controllers: [PersonController],
  providers: [PersonService],
  exports:[PersonService]
})
export class PersonModule {}
