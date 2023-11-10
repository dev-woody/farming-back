import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { Review } from "src/reviews/entities/review.entity";
import { Cart } from "src/cart/entities/cart.entity";
import { Order } from "src/orders/entities/order.entity";
import { CommonColumns } from "types/common_type";

@Entity({ name: "users" })
export class User extends CommonColumns {
  @Column()
  name: string;

  @Column({ nullable: true })
  profile_img: string;

  @Column()
  user_id: string;

  @Column({ select: false })
  password: string;

  @Column()
  zip_code: number;

  @Column()
  address: string;

  @Column()
  address_detail: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true, select: false })
  refreshToken: string;

  @OneToMany(() => Review, (review) => review.user, {
    cascade: true,
  })
  reviews: Review[];

  @OneToOne(() => Cart, (cart) => cart.user, {
    cascade: true,
  })
  carts: Cart;

  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
  })
  orders: Order[];
}
