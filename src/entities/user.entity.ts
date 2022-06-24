import { compare } from "bcrypt";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  comparePwd = async (pwd: string): Promise<boolean> => {
    return await compare(pwd, this.password);
  };
}
