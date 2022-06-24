import { User } from "../entities";
import AppDataSource from "../data-source";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

interface IUserRepo {
  save: (user: Partial<User>) => Promise<User>;
  retrieve: (payload: object) => Promise<User>;
  getAll: () => Promise<User[]>;
  update: (id: string, payload: object) => Promise<UpdateResult>;
  delete: (id: string) => Promise<DeleteResult>;
}

class UserRepository implements IUserRepo {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  save = async (user: Partial<User>) => await this.repo.save(user);

  retrieve = async (payload: object) =>
    await this.repo.findOneBy({ ...payload });

  getAll = async () => await this.repo.find();

  update = async (id: string, payload: object) =>
    await this.repo.update(id, { ...payload });

  delete = async (id: string) => await this.repo.delete(id);
}

export default new UserRepository();
