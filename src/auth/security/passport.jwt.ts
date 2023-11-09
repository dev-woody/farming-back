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
        (request: any) => {
          return request?.cookies["ACCESS_TOKEN"];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
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

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh-token",
) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.REFRESH_TOKEN;
        },
      ]),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: Payload) {
    const { user_id } = payload;
    const refreshToken = req.cookies?.REFRESH_TOKEN;
    return this.usersService.getUserIfRefreshTokenMatches(
      refreshToken,
      user_id,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // async validate(payload) {
  //   const refreshToken = request.cookies?.Refresh;
  //   return this.usersService.getUserIfRefreshTokenMatches(
  //     refreshToken,
  //     payload.user_id,
  //   );
  // }
}

export interface Payload {
  user_id: string;
  //role:string
}
