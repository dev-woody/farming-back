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
import { Product } from "src/products/entities/product.entity";
import { Cart_Item_Option } from "./cart_item_option.entity";
import { Cart } from "./cart.entity";

@Entity({ name: "cart_item" })
export class Cart_Item {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ nullable: true })
  prod_id: string;

  @Column({ nullable: true })
  cart_id: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Cart_Item_Option, (option) => option.cart_item_id)
  cart_item_options: Cart_Item_Option[];

  @JoinColumn({ name: "prod_id" })
  @ManyToOne(() => Product, (product) => product.cart_items)
  product: string;

  @JoinColumn({ name: "cart_id" })
  @ManyToOne(() => Cart, (cart) => cart.cart_items)
  cart: string;
}
