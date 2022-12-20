import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CredentialModule } from './credential/credential.module';
import { Credential } from './credential/entities/credential.entity';
import { State } from './state/entities/state.entity';
import { StateModule } from './state/state.module';

@Module({
  imports: [
    CredentialModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password: process.env.MYSQL_ROOT_PASSWORD, 
      database:'todo',
      entities:[Credential, State],
      synchronize:true
    }),
    StateModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
