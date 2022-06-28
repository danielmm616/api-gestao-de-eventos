import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Invoice } from "./invoice.entity";
import { Event } from "./event.entity";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  quantity: number;

  @Column({ type: "float" })
  price: number;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @ManyToOne(() => Event, (event) => event.orders, { eager: true })
  event: Event;

  @OneToOne(() => Invoice, (invoice) => invoice, { eager: true })
  @JoinColumn()
  invoice?: Invoice;
}
