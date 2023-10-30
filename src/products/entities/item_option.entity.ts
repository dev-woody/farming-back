import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart_Item_Option } from "src/cart/entities/cart_item_option.entity";
import { Option } from "./option.entity";

@Entity({ name: "item_options" })
export class Item_Option {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  option_id: string;

  @Column()
  opt_value: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  sale_price: number;

  @Column()
  unavailable: boolean;

  @OneToMany(() => Cart_Item_Option, (cart_option) => cart_option.cart_item_id)
  cart_item_options: Cart_Item_Option[];

  @JoinColumn({ name: "option_id" })
  @ManyToOne(() => Option, (option) => option.option_item)
  option: string;
}
