import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";

import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

export interface Payload {
  user_id: string;
  //role:string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  "jwt-access-token",
) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.ACCESS_TOKEN;
        },
      ]),
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (request: any) => {
      //     console.log(request?.cookies);
      //     return request?.cookies?.ACCESS_TOKEN;
      //   },
      // ]),
      // ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      passReqToCallback: true,
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
