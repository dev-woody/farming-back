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

@Entity({ name: "cart" })
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  uuid: number;

  @Column()
  user_id: string;

  @Column()
  prod_id: string;

  @Column()
  option_id: string;

  @Column()
  quantity: number;

  @Column()
  result: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => Cart, (cart) => cart.user_id)
  user: string;
}
