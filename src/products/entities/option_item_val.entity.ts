import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Cart_Item_Option } from "src/cart/entities/cart_item_option.entity";
import { Option } from "./option.entity";
import { CommonColumns } from "types/common_type";
import { Order_Item_Opt } from "src/orders/entities/order_item_opt.entity";

@Entity({ name: "prod_option_vals" })
export class Prod_Option_Val extends CommonColumns {
  @Column()
  opt_value: string;

  // @Column()
  // option_id: string;

  @Column()
  price: number;

  @Column({ default: false })
  unavailable: boolean;

  @JoinColumn()
  @ManyToOne(() => Option, (option) => option.option_items)
  option_uuid: string;

  @OneToMany(
    () => Cart_Item_Option,
    (cart_option) => cart_option.prod_opt_val,
    {
      cascade: true,
    },
  )
  cart_item_options: Cart_Item_Option[];

  @OneToMany(
    () => Order_Item_Opt,
    (order_item_opt) => order_item_opt.prod_opt_val,
    {
      cascade: true,
    },
  )
  order_item_opts: Order_Item_Opt[];
}
