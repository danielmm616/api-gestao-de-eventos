import { Order } from "../entities";
import AppDataSource from "../data-source";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

interface IOrderRepo {
  save: (payload: Partial<Order>) => Promise<Order>;
  retrieve: (payload: object) => Promise<Order>;
  getAll: () => Promise<Order[]>;
  update: (id: string, payload: object) => Promise<UpdateResult>;
  delete: (id: string) => Promise<DeleteResult>;
}

class OrderRepository implements IOrderRepo {
  private repo: Repository<Order>;

  constructor() {
    this.repo = AppDataSource.getRepository(Order);
  }

  save = async (payload: Partial<Order>) => await this.repo.save(payload);

  retrieve = async (payload: object) =>
    await this.repo.findOneBy({ ...payload });

  getAll = async () => await this.repo.find();

  update = async (id: string, payload: object) =>
    await this.repo.update(id, { ...payload });

  delete = async (id: string) => await this.repo.delete(id);
}

export default new OrderRepository();
