import { Controller,  Post, Body } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  
  constructor(private readonly seedService: SeedService) {}

  @Post()
  useSeed() {
    return this.seedService.useSeed();
  }  
}
