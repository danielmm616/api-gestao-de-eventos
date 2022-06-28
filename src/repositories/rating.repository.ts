import { Rating } from "../entities";
import AppDataSource from "../data-source";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

interface IRatingRepo {
  save: (payload: Partial<Rating>) => Promise<Rating>;
  retrieve: (payload: object) => Promise<Rating>;
  getAll: () => Promise<Rating[]>;
  update: (id: string, payload: object) => Promise<UpdateResult>;
  delete: (id: string) => Promise<DeleteResult>;
}

class RatingRepository implements IRatingRepo {
  private repo: Repository<Rating>;

  constructor() {
    this.repo = AppDataSource.getRepository(Rating);
  }

  save = async (payload: Partial<Rating>) => await this.repo.save(payload);

  retrieve = async (payload: object) =>
    await this.repo.findOneBy({ ...payload });

  getAll = async () => await this.repo.find();

  update = async (id: string, payload: object) =>
    await this.repo.update(id, { ...payload });

  delete = async (id: string) => await this.repo.delete(id);
}

export default new RatingRepository();
