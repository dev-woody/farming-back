import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Cart_Item } from "./cart_item.entity";
import { CommonColumns } from "types/common_type";

@Entity({ name: "carts" })
export class Cart extends CommonColumns {
  @OneToMany(() => Cart_Item, (cart_item) => cart_item.cart_uuid, {
    cascade: true,
  })
  cart_items: Cart_Item[];

  @JoinColumn()
  @OneToOne(() => User, (user) => user.carts)
  user: string;
}
