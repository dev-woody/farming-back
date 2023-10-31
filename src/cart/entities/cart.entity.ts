import { User } from "src/users/entities/user.entity";
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
import { Cart_Item_Option } from "./cart_item_option.entity";
import { Product } from "src/products/entities/product.entity";

@Entity({ name: "carts" })
export class Cart_Item {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  opt_name: string;

  @Column({ nullable: true })
  user_id: string;

  @Column({ nullable: true })
  prod_id: string;

  @Column()
  prod_img: string;

  @Column()
  prod_name: string;

  @Column({ default: "CART" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Cart_Item_Option, (option) => option.cart_item, {
    cascade: true,
  })
  cart_item_options: Cart_Item_Option[];

  @JoinColumn({ name: "prod_id" })
  @ManyToOne(() => Product, (product) => product.cart_items)
  product: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User, (user) => user.carts)
  user: string;
}
