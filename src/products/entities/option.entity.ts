import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";
import { Item_Option } from "./item_option.entity";

@Entity({ name: "prod_options" })
export class Option {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  opt_name: string;

  @Column()
  prod_id: string;

  @Column()
  unavailable: boolean;

  @OneToMany(() => Item_Option, (option_item) => option_item.option_id)
  option_item: Item_Option[];

  @JoinColumn({ name: "prod_id" })
  @ManyToOne(() => Product, (product) => product.options)
  product: string;
}
