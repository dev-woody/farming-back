import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly memberService: MembersService) {}

  @Get()
  getAll() {
    return this.memberService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return `return ${id}`;
  }

  @Post()
  create(@Body() createData) {
    return createData;
  }
}
