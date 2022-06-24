import { compare } from "bcrypt";
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Event } from "./event.entity";
import { User } from "./user.entity";
import { Order } from "./order.entity";

@Entity("invoices")
export class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  purchaseDate: Date;

  @Column()
  totalPrice: number;

  @OneToOne(() => Order, (order) => order)
  order: Order;
}
