import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(payload: Payload, done: VerifiedCallback): Promise<User> {
    const { user_id } = payload;
    const user = await this.usersService.findByUserId(user_id);
    if (!user) {
      throw new UnauthorizedException({ message: "회원 존재하지 않음." });
    }

    return user;
  }
}

export interface Payload {
  user_id: string;
  //role:string
}
