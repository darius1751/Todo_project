import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { PersonModule } from 'src/person/person.module';
import { TypeModule } from 'src/type/type.module';
import { StateModule } from 'src/state/state.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Task]),
    PersonModule,
    TypeModule,
    StateModule
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports:[TaskService]
})
export class TaskModule {}
