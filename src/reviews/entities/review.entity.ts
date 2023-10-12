import { Product } from "src/products/entities/product.entity";
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

@Entity({ name: "reviews" })
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  product_id: string;

  @Column({ nullable: true })
  user_id: string;

  @Column()
  rating: number;

  @Column()
  content: string;

  @Column({ type: "text", array: true })
  image_id: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinColumn({ name: "product_id" })
  @ManyToOne(() => Product, (product) => product.reviews)
  product: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User, (user) => user.reviews)
  user: string;
}
