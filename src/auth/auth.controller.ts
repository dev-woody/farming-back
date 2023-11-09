import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Req,
  UseGuards,
  Get,
  HttpCode,
  Res,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { AuthDTO } from "./dto/auth.dto";

import * as bcrypt from "bcrypt";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { JwtAccesshGuard, JwtRefreshGuard } from "./guard/auth.guard";

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post("signIn")
  async signIn(@Body() authDTO: AuthDTO.SignIn, @Req() request: Request) {
    const { user_id, password } = authDTO;

    const user = await this.usersService.findByUserId(user_id);
    if (!user) {
      throw new UnauthorizedException("아이디를 확인해 주세요.");
    }

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) {
      throw new UnauthorizedException("비밀번호를 확인해 주세요.");
    }

    const accessToken = this.authService.getJwtAccessToken(user.user_id);
    const { cookie: refreshTokenCookie, refreshToken: refreshToken } =
      await this.authService.getJwtRefreshToken(user.user_id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.uuid);
    request.res.setHeader("Set-Cookie", [...accessToken, refreshTokenCookie]);

    delete user.password;
    return {
      ...user,
    };
  }

  @UseGuards(JwtAccesshGuard)
  @Post("logout")
  @HttpCode(200)
  async logout(@Req() req: Request, @Res() res): Promise<any> {
    await this.usersService.removeRefreshToken(res.user.uuid);
    res.setHeader("Set-Cookie", this.authService.getCookiesForLogOut());
  }

  @UseGuards(JwtAccesshGuard)
  @Get()
  authenticate(@Req() req: Request) {
    const user = req.user;
    return user;
  }

  // Refresh Guard를 적용한다.
  @UseGuards(JwtRefreshGuard)
  @Get("/refresh")
  refresh(@Req() req: any) {
    const accessTokenCookie = this.authService.getJwtAccessToken(req.user.uuid);
    req.res.setHeader("Set-Cookie", accessTokenCookie);
    return req.user;
  }
}
