import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: "options" })
export class Option {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  sale_price: number;

  @Column()
  unavailable: boolean;

  @Column({ nullable: true })
  product_id: string;

  @JoinColumn({ name: "product_id" })
  @ManyToOne(() => Product, (product) => product.options)
  product: string;
}
