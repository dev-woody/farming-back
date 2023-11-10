import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { ProductsModule } from "./products/products.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { CartModule } from "./cart/cart.module";
import { OrdersModule } from "./orders/orders.module";
import { UploadModule } from "./upload/upload.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { ReviewsModule } from "./reviews/reviews.module";
import { PaymentsModule } from "./payments/payments.module";
import { JwtStrategy } from "./auth/security/jwt-access.strategy";
import { JwtRefreshStrategy } from "./auth/security/jwt-refresh.strategy";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../../static"),
      exclude: ["/api/(.*)"],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.database,
      entities: [__dirname + "/**/*.entity.{js,ts}"],
      synchronize: true,
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    CartModule,
    OrdersModule,
    UploadModule,
    ReviewsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, JwtRefreshStrategy],
})
export class AppModule {}
