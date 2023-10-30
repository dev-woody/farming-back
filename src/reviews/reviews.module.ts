import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { User } from "src/users/entities/user.entity";
import { Product } from "src/products/entities/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./entities/review.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Product])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
