import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export abstract class DateColumns {
  @CreateDateColumn({ precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ precision: 0 })
  updatedAt: Date;

  @DeleteDateColumn({ precision: 0 })
  deletedAt: Date;
}

@Entity()
export abstract class CommonColumns extends DateColumns {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;
}
