import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "images" })
export class Upload {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  kind: string;

  @Column()
  path: string;
}
