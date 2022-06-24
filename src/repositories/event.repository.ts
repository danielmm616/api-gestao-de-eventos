import { Event } from "../entities";
import AppDataSource from "../data-source";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

interface IEventRepo {
  save: (payload: Partial<Event>) => Promise<Event>;
  retrieve: (payload: object) => Promise<Event>;
  getAll: () => Promise<Event[]>;
  update: (id: string, payload: object) => Promise<UpdateResult>;
  delete: (id: string) => Promise<DeleteResult>;
}

class EventRepository implements IEventRepo {
  private repo: Repository<Event>;

  constructor() {
    this.repo = AppDataSource.getRepository(Event);
  }

  save = async (payload: Partial<Event>) => await this.repo.save(payload);

  retrieve = async (payload: object) =>
    await this.repo.findOneBy({ ...payload });

  getAll = async () => await this.repo.find();

  update = async (id: string, payload: object) =>
    await this.repo.update(id, { ...payload });

  delete = async (id: string) => await this.repo.delete(id);
}

export default new EventRepository();
