import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { Cart } from "./entities/cart.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Option } from "src/products/entities/option.entity";
import { ProductsService } from "src/products/products.service";
import { Item_Option } from "src/products/entities/item_option.entity";
import { UsersService } from "src/users/users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, User, Product, Option, Item_Option]),
  ],
  controllers: [CartController],
  providers: [CartService, ProductsService, UsersService],
})
export class CartModule {}
