import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAccesshGuard extends AuthGuard("jwt-access-token") {}
