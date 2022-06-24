import { Invoice } from "../entities";
import AppDataSource from "../data-source";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

interface IInvoiceRepo {
  save: (payload: Partial<Invoice>) => Promise<Invoice>;
  retrieve: (payload: object) => Promise<Invoice>;
  getAll: () => Promise<Invoice[]>;
  update: (id: string, payload: object) => Promise<UpdateResult>;
  delete: (id: string) => Promise<DeleteResult>;
}

class InvoiceRepository implements IInvoiceRepo {
  private repo: Repository<Invoice>;

  constructor() {
    this.repo = AppDataSource.getRepository(Invoice);
  }

  save = async (payload: Partial<Invoice>) => await this.repo.save(payload);

  retrieve = async (payload: object) =>
    await this.repo.findOneBy({ ...payload });

  getAll = async () => await this.repo.find();

  update = async (id: string, payload: object) =>
    await this.repo.update(id, { ...payload });

  delete = async (id: string) => await this.repo.delete(id);
}

export default new InvoiceRepository();
