import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";
import { User } from "./user.entity";

@Entity("rating")
export class Rating {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  stars: number;

  @ManyToOne(() => Event, (event) => event.ratings, { eager: true })
  event: Event;

  @ManyToOne(() => User, (user) => user.ratings, { eager: true })
  user: User;
}
