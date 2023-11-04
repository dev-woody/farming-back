import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Product } from "./product.entity";
import { Prod_Option_Val } from "./option_item_val.entity";
import { CommonColumns } from "types/common_type";

@Entity({ name: "prod_options" })
export class Option extends CommonColumns {
  @Column()
  opt_name: string;

  @Column({ nullable: true })
  prod_id: string;

  @Column({ default: false })
  unavailable: boolean;

  @JoinColumn({ name: "prod_uuid" })
  @ManyToOne(() => Product, (product) => product.options)
  product: string;

  @OneToMany(() => Prod_Option_Val, (option_item) => option_item.option, {
    cascade: true,
  })
  option_items: Prod_Option_Val[];
}
