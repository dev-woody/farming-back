import {
  Controller,
  Get,
  Post,
  Body,
  ConflictException,
  UseGuards,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthDTO } from "src/auth/dto/auth.dto";
import { JwtAccesshGuard } from "src/auth/guard/jwt-auth-access.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/signUp")
  async signUp(@Body() authDTO: AuthDTO.SignUp) {
    const { user_id } = authDTO;

    const hasUserId = await this.usersService.findByUserId(user_id);
    if (hasUserId) {
      throw new ConflictException("이미 사용중인 아이디입니다.");
    }
    const userEntity = await this.usersService.create(authDTO);

    return userEntity;
  }

  @UseGuards(JwtAccesshGuard)
  @Get("/cart")
  async findCart(@Req() req: any) {
    const user = req.user;
    return await this.usersService.findCart(user.uuid);
  }

  @UseGuards(JwtAccesshGuard)
  @Get("/")
  async findById(@Req() req: any) {
    const user = req.user;
    delete user.password;
    delete user.refreshToken;
    // return await this.usersService.findById(user.uuid);
    return user;
  }

  @UseGuards(JwtAccesshGuard)
  @Get()
  async getProfile(@Req() req: any) {
    const user = req.user;
    return user;
  }
}
