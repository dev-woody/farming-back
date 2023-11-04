import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Cart_Item } from "./cart_item.entity";
import { CommonColumns } from "types/common_type";

@Entity({ name: "carts" })
export class Cart extends CommonColumns {
  @Column({ nullable: true })
  user_id: string;

  @OneToMany(() => Cart_Item, (cart_item) => cart_item.cart, {
    cascade: true,
  })
  cart_items: Cart_Item[];

  @JoinColumn({ name: "user_uuid" })
  @ManyToOne(() => User, (user) => user.carts)
  user: string;
}
