import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "images" })
export class Upload {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  kind: string;

  @Column()
  path: string;
}
