import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart_Item } from "./cart_Item.entity";
import { Item_Option } from "src/products/entities/item_option.entity";

@Entity({ name: "cart_item_options" })
export class Cart_Item_Option {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  sale_price: number;

  @JoinColumn()
  @ManyToOne(() => Cart_Item, (cart_item) => cart_item.cart_item_options)
  cart_item_id: string;

  @JoinColumn()
  @ManyToOne(() => Item_Option, (option) => option.cart_item_options)
  option_id: string;
}
