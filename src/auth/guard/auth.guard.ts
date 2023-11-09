import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAccesshGuard extends AuthGuard("jwt-access-token") {
  // canActivate(context: ExecutionContext): any {
  //   return super.canActivate(context);
  // }
}

@Injectable()
export class JwtRefreshGuard extends AuthGuard("jwt-refresh-token") {}
