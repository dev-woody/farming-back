import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import * as bcrypt from "bcrypt";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @Column()
  password: string;

  @Column()
  zip_code: number;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  private beforeInsert() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
