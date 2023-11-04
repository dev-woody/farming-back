import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CommonColumns } from "types/common_type";
import { Order_Item } from "./order_item.entity";

@Entity({ name: "orders" })
export class Order extends CommonColumns {
  @Column({ nullable: true })
  user_id: string;

  @Column()
  order_name: string;

  @Column()
  order_price: number;

  @Column()
  shipping_fee: number;

  @Column()
  status: number;

  @Column()
  zip_code: number;

  @Column()
  address: string;

  @Column()
  address_detail: string;

  @Column()
  phone: string;

  @Column()
  delevery_memo: string;

  @JoinColumn({ name: "user_uuid" })
  @ManyToOne(() => User, (user) => user.orders)
  user: string;

  @OneToMany(() => Order_Item, (order_item) => order_item.order)
  order_items: Order_Item[];
}
