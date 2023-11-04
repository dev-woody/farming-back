import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { Cart } from "src/cart/entities/cart.entity";
import { Option } from "./entities/option.entity";
import { Prod_Option_Val } from "./entities/option_item_val.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Option, Prod_Option_Val, Cart]),
  ],
  exports: [ProductsService],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
