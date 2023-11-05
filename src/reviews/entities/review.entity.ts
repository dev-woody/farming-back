import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CommonColumns } from "types/common_type";

@Entity({ name: "reviews" })
export class Review extends CommonColumns {
  @Column({ nullable: true })
  product_id: string;

  @Column({ nullable: true })
  user_uuid: string;

  @Column()
  rating: number;

  @Column()
  content: string;

  @Column({ type: "text", array: true })
  image_id: string[];

  @JoinColumn({ name: "product_id" })
  @ManyToOne(() => Product, (product) => product.reviews)
  product: string;

  @JoinColumn({ name: "user_uuid" })
  @ManyToOne(() => User, (user) => user.reviews)
  user: string;
}
