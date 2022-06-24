import { Company, Event, Invoice, Order, User } from "../entities";

declare global {
  namespace Express {
    interface Request {
      validated: User | Company | Event | Order | Invoice;
      user: User;
      company: Company;
      event: Event;
      order: Order;
      invoice: Invoice;
      decoded: Partial<User>;
    }
  }
}
