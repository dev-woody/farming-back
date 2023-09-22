import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  user_id: number;

  @Column()
  price: number;

  @Column()
  memo: string;

  @Column()
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
