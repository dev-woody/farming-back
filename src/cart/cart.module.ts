import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { Cart } from "./entities/cart.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { ProductsService } from "src/products/products.service";
import { Option } from "src/products/entities/option.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User, Product, Option])],
  controllers: [CartController],
  providers: [CartService, UsersService, ProductsService],
})
export class CartModule {}
