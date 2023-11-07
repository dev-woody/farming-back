import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Cart_Item } from "./cart_item.entity";
import { Prod_Option_Val } from "src/products/entities/option_item_val.entity";
import { CommonColumns } from "types/common_type";

@Entity({ name: "cart_item_opts" })
export class Cart_Item_Option extends CommonColumns {
  @Column()
  quantity: number;

  @JoinColumn()
  @ManyToOne(() => Cart_Item, (cart_item) => cart_item.cart_item_opts)
  cart_item: string;

  @JoinColumn()
  @ManyToOne(
    () => Prod_Option_Val,
    (prod_opt_val) => prod_opt_val.cart_item_options,
  )
  prod_opt_val: string;
}
