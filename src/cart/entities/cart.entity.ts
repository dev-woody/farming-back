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
import { Cart_Item } from "./cart_item.entity";

@Entity({ name: "carts" })
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ nullable: true })
  user_id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Cart_Item, (cart_item) => cart_item.cart, {
    cascade: true,
  })
  cart_items: Cart_Item[];

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User, (user) => user.carts)
  user: string;
}
