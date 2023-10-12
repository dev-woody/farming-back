import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { AuthDTO } from "./dto/auth.dto";

import { JwtService } from "@nestjs/jwt/dist";
import * as bcrypt from "bcrypt";

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post("signIn")
  async signIn(@Body() authDTO: AuthDTO.SignIn) {
    const { user_id, password } = authDTO;

    const user = await this.usersService.findByUserId(user_id);
    if (!user) {
      throw new UnauthorizedException("아이디를 확인해 주세요.");
    }

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) {
      throw new UnauthorizedException("비밀번호를 확인해 주세요.");
    }

    const payload = {
      user_id: user.user_id,
    };

    const accessToken = this.jwtService.sign(payload);
    delete user.password;
    return {
      ...user,
      accessToken: accessToken,
    };
  }
}
