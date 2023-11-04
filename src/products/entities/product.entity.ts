import { Column, Entity, OneToMany } from "typeorm";
import { Option } from "./option.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Cart_Item } from "src/cart/entities/cart_item.entity";
import { CommonColumns } from "types/common_type";
import { Order_Item } from "src/orders/entities/order_item.entity";

@Entity({ name: "products" })
export class Product extends CommonColumns {
  @Column()
  prod_name: string;

  @Column()
  category: string;

  @Column()
  default_price: number;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @Column()
  detail_page: string;

  @Column()
  sale_rate: number;

  @Column()
  given_point_rate: number;

  @OneToMany(() => Option, (option) => option.product, {
    cascade: true,
  })
  options: Option[];

  @OneToMany(() => Review, (review) => review.product, {
    cascade: true,
  })
  reviews: Review[];

  @OneToMany(() => Cart_Item, (cart_item) => cart_item.product, {
    cascade: true,
  })
  cart_items: Cart_Item[];

  @OneToMany(() => Order_Item, (order_item) => order_item.product, {
    cascade: true,
  })
  order_items: Order_Item[];
}
