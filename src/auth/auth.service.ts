import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getJwtAccessToken(user_id: string) {
    const payload = { user_id };
    const accessToken: string = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME + "s",
    });
    return [
      `ACCESS_TOKEN=${accessToken}; HttpOnly; Path=/; Max-Age=${process.env.JWT_ACCESS_EXPIRATION_TIME}`,
      `Authorization=${accessToken}; HttpOnly; Path=/; Max-Age=${process.env.JWT_ACCESS_EXPIRATION_TIME}`,
    ];
  }

  async getJwtRefreshToken(user_id: string) {
    const payload = { user_id };
    const refreshToken: string = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME + "s",
    });
    const cookie = `REFRESH_TOKEN=${refreshToken}; HttpOnly; Path=/; Max-Age=${process.env.JWT_REFRESH_EXPIRATION_TIME}`;
    return { refreshToken, cookie };
  }

  getCookiesForLogOut() {
    return [
      "ACCESS_TOKEN=; HttpOnly; Path=/; Max-Age=0",
      "REFRESH_TOKEN=; HttpOnly; Path=/; Max-Age=0",
    ];
  }
}
