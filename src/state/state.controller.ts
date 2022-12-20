import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { StateService } from './state.service';


@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.create(createStateDto);
  }

  @Get()
  findAll() {
    return this.stateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.stateService.findOne(id);
  }

}
