import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./company.entity";
import { Invoice } from "./invoice.entity";
import { Order } from "./order.entity";
import { Rating } from "./rating.entity";
import { User } from "./user.entity";

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "float" })
  price: number;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  location: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Company, (company) => company.events, { eager: true })
  company: Company;

  @OneToMany(() => User, (user) => user.event)
  users: User[];

  @OneToMany(() => Invoice, (invoice) => invoice.event)
  invoices: Invoice[];

  @OneToMany(() => Rating, (rating) => rating.event)
  ratings: Rating[];

  @OneToMany(() => Order, (order) => order.event)
  orders: Order[];
}
