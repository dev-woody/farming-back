import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "cart" })
export class Cart {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  user_id: number;

  @Column()
  prod_num: number;

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
}
