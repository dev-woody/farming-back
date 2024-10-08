import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CommonColumns } from "types/common_type";

@Entity({ name: "reviews" })
export class Review extends CommonColumns {
  @Column()
  prod_uuid: string;

  @Column()
  user_uuid: string;

  @Column()
  rating: number;

  @Column()
  content: string;

  // @Column({ type: "text", array: true })
  // image_id: string[];

  @JoinColumn({ name: "prod_uuid" })
  @ManyToOne(() => Product, (product) => product.reviews)
  product: string;

  @JoinColumn({ name: "user_uuid" })
  @ManyToOne(() => User, (user) => user.reviews)
  user: string;
}
