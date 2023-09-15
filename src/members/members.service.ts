import { Injectable } from '@nestjs/common';
import { Member } from './ entities/members.entity';

@Injectable()
export class MembersService {
  private members: Member[] = [];
  getAll(): Member[] {
    return this.members;
  }
}
