import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Cart_Item } from "./cart.entity";
import { Item_Option } from "src/products/entities/item_option.entity";

@Entity({ name: "cart_item" })
export class Cart_Item_Option {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ nullable: true })
  cart_item_id: string;

  @Column({ nullable: true })
  option_item_id: string;

  @Column()
  opt_value: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  sale_price: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinColumn({ name: "cart_item_id" })
  @ManyToOne(() => Cart_Item, (cart_item) => cart_item.cart_item_options)
  cart_item: string;

  @JoinColumn({ name: "option_item_id" })
  @ManyToOne(() => Item_Option, (option) => option.cart_item_options)
  option_item: string;
}
