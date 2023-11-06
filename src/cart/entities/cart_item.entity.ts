import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Cart_Item_Option } from "./cart_item_option.entity";
import { Cart } from "./cart.entity";
import { Product } from "src/products/entities/product.entity";
import { CommonColumns } from "types/common_type";

@Entity({ name: "cart_items" })
export class Cart_Item extends CommonColumns {
  @Column()
  opt_name: string;

  @OneToMany(() => Cart_Item_Option, (option) => option.cart_item_uuid, {
    cascade: true,
  })
  cart_item_options: Cart_Item_Option[];

  @JoinColumn()
  @ManyToOne(() => Cart, (cart) => cart.cart_items)
  cart_uuid: string;

  @JoinColumn()
  @ManyToOne(() => Product, (product) => product.cart_items)
  prod_uuid: string;
}
