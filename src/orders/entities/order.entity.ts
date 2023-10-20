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
  @PrimaryGeneratedColumn("uuid")
  uuid: number;

  @Column()
  user_id: number;

  @Column()
  price: number;

  @Column()
  memo: string;

  @Column()
  status: number;

  @Column()
  zip_code: number;

  @Column()
  address: string;

  @Column()
  address_detail: string;

  @Column()
  phone: string;

  @Column()
  delevery_memo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
