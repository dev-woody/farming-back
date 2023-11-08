import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Cart_Item_Option } from "./cart_item_option.entity";
import { Cart } from "./cart.entity";
import { Product } from "src/products/entities/product.entity";
import { CommonColumns } from "types/common_type";

@Entity({ name: "cart_items" })
export class Cart_Item extends CommonColumns {
  @OneToMany(() => Cart_Item_Option, (option) => option.cart_item, {
    cascade: true,
  })
  cart_item_opts: Cart_Item_Option[];

  @Column()
  total_amount: number;

  @JoinColumn()
  @ManyToOne(() => Cart, (cart) => cart.cart_items)
  cart: string;

  @JoinColumn()
  @ManyToOne(() => Product, (product) => product.cart_items)
  product: Product;
}
