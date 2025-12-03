import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("employees")
export class Employee {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @Column({ type: "varchar", name: "first_name" })
  firstName: string;

  @Column({ type: "varchar", name: "last_name" })
  lastName: string;

  @Column({ type: "int", name: "age" })
  age: number;

  @Column({ type: "varchar", name: "sex" })
  sex: string;
}
