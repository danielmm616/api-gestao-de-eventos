import { compare } from "bcrypt";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./company.entity";
import { Event } from "./event.entity";
import { Order } from "./order.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  bio: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Company, (company) => company.employees, { eager: true })
  company: Company;

  @ManyToOne(() => Event, (event) => event.users, { eager: true })
  event: Event;

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];

  comparePwd = async (pwd: string): Promise<boolean> => {
    return await compare(pwd, this.password);
  };
}
