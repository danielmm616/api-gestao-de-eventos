import { Company } from "../entities";
import AppDataSource from "../data-source";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

interface ICompanyRepo {
  save: (payload: Partial<Company>) => Promise<Company>;
  retrieve: (payload: object) => Promise<Company>;
  getAll: () => Promise<Company[]>;
  update: (id: string, payload: object) => Promise<UpdateResult>;
  delete: (id: string) => Promise<DeleteResult>;
}

class CompanyRepository implements ICompanyRepo {
  private repo: Repository<Company>;

  constructor() {
    this.repo = AppDataSource.getRepository(Company);
  }

  save = async (payload: Partial<Company>) => await this.repo.save(payload);

  retrieve = async (payload: object) =>
    await this.repo.findOneBy({ ...payload });

  getAll = async () => await this.repo.find();

  update = async (id: string, payload: object) =>
    await this.repo.update(id, { ...payload });

  delete = async (id: string) => await this.repo.delete(id);
}

export default new CompanyRepository();
