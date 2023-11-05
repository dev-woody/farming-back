import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Cart_Item_Option } from "./cart_item_option.entity";
import { Cart } from "./cart.entity";
import { Product } from "src/products/entities/product.entity";
import { CommonColumns } from "types/common_type";

@Entity({ name: "cart_items" })
export class Cart_Item extends CommonColumns {
  @Column()
  opt_name: string;

  @Column()
  prod_uuid: string;

  @Column()
  cart_uuid: string;

  @OneToMany(() => Cart_Item_Option, (option) => option.cart_item, {
    cascade: true,
  })
  cart_item_options: Cart_Item_Option[];

  @JoinColumn({ name: "cart_uuid" })
  @ManyToOne(() => Cart, (cart) => cart.cart_items)
  cart: string;

  @JoinColumn({ name: "prod_uuid" })
  @ManyToOne(() => Product, (product) => product.cart_items)
  product: string;
}
