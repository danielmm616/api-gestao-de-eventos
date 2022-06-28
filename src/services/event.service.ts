import { Request } from "express";
import { Event } from "../entities";
import { companyRepository, eventRepository } from "../repositories";
import dotenv from "dotenv";
import { ErrorHandler } from "../errors/errors";
import { serializedCreateEventSchema, serializedEventSchema } from "../schemas";

dotenv.config();

class EventService {
  create = async (req: Request) => {
    const company = await companyRepository.retrieve({ id: req.decoded.id });

    if (!company) {
      throw new ErrorHandler(401, "You must be a company to create an event");
    }

    const event = req.validated as Event;
    event.company = company;
    event.users = [];
    event.invoices = [];

    const newEvent = await eventRepository.save(event as Event);

    return await serializedCreateEventSchema.validate(newEvent, {
      stripUnknown: true,
    });
  };

  getAll = async () => {
    const events = (await eventRepository.getAll()).filter(
      (event) => event.active === true
    );
    return await serializedEventSchema.validate(events, {
      stripUnknown: true,
    });
  };

  getById = async (id: string) => {
    const event = await eventRepository.retrieve({ id });
    return event;
  };

  delete = async (id: string, req: Request) => {
    const company = await companyRepository.retrieve({ id: req.decoded.id });
    const event = await eventRepository.retrieve({ id });

    if (!event) {
      throw new ErrorHandler(404, "Event not found");
    }

    if (!company) {
      throw new ErrorHandler(401, "You must be a company to close an event");
    }

    if (event.company.id !== company.id) {
      throw new ErrorHandler(401, "You must be the company to close an event");
    }

    await eventRepository.delete(event.id);
  };

  closeEvent = async (id: string, req: Request) => {
    const company = await companyRepository.retrieve({ id: req.decoded.id });
    const event = await eventRepository.retrieve({ id });

    if (!event) {
      throw new ErrorHandler(404, "Event not found");
    }

    if (!company) {
      throw new ErrorHandler(401, "You must be a company to close an event");
    }

    if (event.company.id !== company.id) {
      throw new ErrorHandler(401, "You must be the company to close an event");
    }

    event.active = false;
    await eventRepository.update(event.id, event);

    return event;
  };
}

export default new EventService();
