import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Option } from "./option.entity";
import { Review } from "src/reviews/entities/review.entity";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  prd_name: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @Column()
  detail_page: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Option, (option) => option.product)
  options: Option[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
