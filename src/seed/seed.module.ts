import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CredentialModule } from 'src/credential/credential.module';
import { StateModule } from 'src/state/state.module';
import { PersonModule } from 'src/person/person.module';
import { TaskModule } from 'src/task/task.module';
import { TypeModule } from 'src/type/type.module';

@Module({
  imports:[
    CredentialModule,
    StateModule,
    PersonModule,
    TaskModule,
    TypeModule    
  ],
  controllers: [SeedController],
  providers: [SeedService]
})
export class SeedModule {}
