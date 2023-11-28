import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

interface Payload {
  user_id: string;
  //role:string
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
    const refreshToken = req?.cookies?.REFRESH_TOKEN;
    return this.usersService.getUserIfRefreshTokenMatches(
      refreshToken,
      user_id,
    );
  }
}
