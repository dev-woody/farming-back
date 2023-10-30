import { User } from "src/users/entities/user.entity";
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
  uuid: string;

  @Column()
  user_id: string;

  @Column()
  prod_id: string;

  @Column()
  option_id: string;

  @Column()
  quantity: number;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User, (user) => user.carts)
  user: string;
}
