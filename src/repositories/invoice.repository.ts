import { Invoice } from "../entities";
import AppDataSource from "../data-source";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

interface IInvoiceRepo {
  save: (payload: Partial<Invoice>) => Promise<Invoice>;
}

class InvoiceRepository implements IInvoiceRepo {
  private repo: Repository<Invoice>;

  constructor() {
    this.repo = AppDataSource.getRepository(Invoice);
  }

  save = async (payload: Partial<Invoice>) => await this.repo.save(payload);
}

export default new InvoiceRepository();
