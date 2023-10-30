import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { Cart } from "src/cart/entities/cart.entity";
import { Option } from "./entities/option.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Option, Cart])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
