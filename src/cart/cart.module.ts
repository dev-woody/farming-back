import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { Cart } from "./entities/cart.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Option } from "src/products/entities/option.entity";
import { ProductsService } from "src/products/products.service";
import { Prod_Option_Val } from "src/products/entities/option_item_val.entity";
import { UsersService } from "src/users/users.service";
import { Cart_Item_Option } from "./entities/cart_item_option.entity";
import { Cart_Item } from "./entities/cart_item.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cart,
      User,
      Product,
      Option,
      Prod_Option_Val,
      Cart_Item,
      Cart_Item_Option,
    ]),
  ],
  controllers: [CartController],
  providers: [CartService, ProductsService, UsersService],
})
export class CartModule {}
