import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./company.entity";
import { Order } from "./order.entity";
import { User } from "./user.entity";

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  eventName: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  location: string;

  @ManyToOne(() => Company, (company) => company.events, { eager: true })
  company: Company;

  @OneToMany(() => User, (user) => user.event)
  users: User[];

  @OneToMany(() => Order, (order) => order.event)
  orders: Order[];

  @ManyToMany(() => Company, { eager: true, cascade: true })
  @JoinTable()
  partnerCompanies: Company[];
}
