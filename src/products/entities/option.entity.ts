import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Product } from "./product.entity";
import { Prod_Option_Val } from "./option_item_val.entity";
import { CommonColumns } from "types/common_type";

@Entity({ name: "prod_options" })
export class Option extends CommonColumns {
  @Column()
  opt_name: string;

  // @Column()
  // prod_id: string;

  @Column({ default: false })
  unavailable: boolean;

  @JoinColumn()
  @ManyToOne(() => Product, (product) => product.options)
  prod_uuid: string;

  @OneToMany(() => Prod_Option_Val, (option_item) => option_item.option_uuid, {
    cascade: true,
  })
  option_items: Prod_Option_Val[];
}
