import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Event } from "./event.entity";
import { Order } from "./order.entity";

@Entity("invoices")
export class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  purchaseDate: Date;

  @Column({ type: "float" })
  totalPrice: number;

  @ManyToOne(() => Event, (event) => event.invoices, {
    eager: true,
  })
  event: Event;
}
