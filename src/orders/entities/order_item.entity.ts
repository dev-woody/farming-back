import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CommonColumns } from "types/common_type";
import { Order } from "./order.entity";
import { Product } from "src/products/entities/product.entity";
import { Order_Item_Opt } from "./order_item_opt.entity";

@Entity({ name: "order_items" })
export class Order_Item extends CommonColumns {
  @Column()
  order_uuid: string;

  @Column()
  prod_uuid: string;

  @Column()
  order_prod_price: number;

  @JoinColumn({ name: "order_uuid" })
  @ManyToOne(() => Order, (order) => order.order_items)
  order: string;

  @JoinColumn({ name: "prod_uuid" })
  @ManyToOne(() => Product, (product) => product.order_items)
  product: string;

  @OneToMany(
    () => Order_Item_Opt,
    (order_item_opt) => order_item_opt.order_item_uuid,
  )
  order_item_opts: Order_Item_Opt[];
}
