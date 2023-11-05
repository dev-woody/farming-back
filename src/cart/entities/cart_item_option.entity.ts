import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Cart_Item } from "./cart_item.entity";
import { CommonColumns } from "types/common_type";
import { Prod_Option_Val } from "src/products/entities/option_item_val.entity";

@Entity({ name: "cart_item_options" })
export class Cart_Item_Option extends CommonColumns {
  @Column()
  cart_item_id: string;

  @Column()
  prod_opt_val_uuid: string;

  @Column()
  opt_value: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @JoinColumn({ name: "cart_item_id" })
  @ManyToOne(() => Cart_Item, (cart_item) => cart_item.cart_item_options)
  cart_item: string;

  @JoinColumn({ name: "prod_opt_val_uuid" })
  @ManyToOne(
    () => Prod_Option_Val,
    (prod_opt_val) => prod_opt_val.cart_item_options,
  )
  prod_opt_val: string;
}
