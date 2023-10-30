import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { Cart } from "src/cart/entities/cart.entity";
import { Option } from "./entities/option.entity";
import { Item_Option } from "./entities/item_option.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Option, Item_Option, Cart])],
  exports: [ProductsService],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
