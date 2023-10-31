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
import { Product } from "./product.entity";
import { Item_Option } from "./item_option.entity";

@Entity({ name: "prod_options" })
export class Option {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  opt_name: string;

  @Column({ nullable: true })
  prod_id: string;

  @Column({ default: false })
  unavailable: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinColumn({ name: "prod_id" })
  @ManyToOne(() => Product, (product) => product.options)
  product: string;

  @OneToMany(() => Item_Option, (option_item) => option_item.option, {
    cascade: true,
  })
  option_items: Item_Option[];
}
