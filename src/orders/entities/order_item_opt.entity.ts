import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Prod_Option_Val } from "src/products/entities/option_item_val.entity";
import { Order_Item } from "./order_item.entity";

@Entity({ name: "order_item_opts" })
export class Order_Item_Opt {
  @PrimaryColumn()
  order_item_uuid: string;

  @PrimaryColumn()
  prod_opt_val_uuid: string;

  @Column()
  order_option_name: string;

  @Column()
  order_option_value: string;

  @Column()
  order_option_price: string;

  @Column()
  order_option_quantity: string;

  @JoinColumn({ name: "order_item_uuid" })
  @ManyToOne(() => Order_Item, (order_item) => order_item.order_item_opts)
  order_item: string;

  @JoinColumn({ name: "prod_opt_val_uuid" })
  @ManyToOne(
    () => Prod_Option_Val,
    (prod_opt_val) => prod_opt_val.order_item_opts,
  )
  prod_opt_val: string;
}
