import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Cart_Item_Option } from "src/cart/entities/cart_item_option.entity";
import { Option } from "./option.entity";

@Entity({ name: "item_options" })
export class Item_Option {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  opt_value: string;

  @Column({ nullable: true })
  option_id: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  sale_price: number;

  @Column({ default: false })
  unavailable: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinColumn({ name: "option_id" })
  @ManyToOne(() => Option, (option) => option.option_items)
  option: string;

  @OneToMany(() => Cart_Item_Option, (cart_option) => cart_option.option_item, {
    cascade: true,
  })
  cart_item_options: Cart_Item_Option[];
}
