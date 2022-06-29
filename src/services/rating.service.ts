import { Request } from "express";
import { Rating, User } from "../entities";
import { ErrorHandler } from "../errors/errors";
import {
  eventRepository,
  ratingRepository,
  userRepository,
} from "../repositories";
import { serializedRatingSchema } from "../schemas";

class RatingService {
  create = async (req: Request) => {
    const rating = req.body as Rating;
    const user = await userRepository.retrieve({ id: req.decoded.id });
    const event = await eventRepository.retrieve({ id: req.params.eventId });

    if (!event) {
      throw new ErrorHandler(404, "Event not found");
    }

    rating.user = user;
    rating.event = event;

    const newRating = await ratingRepository.save(rating);

    return newRating;
  };

  getAll = async (req: Request) => {
    const ratings = (await ratingRepository.getAll()).filter(
      (rating) => rating.event.id === req.params.eventId
    );

    if (ratings.length === 0) {
      throw new ErrorHandler(404, "No ratings found");
    }

    return await serializedRatingSchema.validate(ratings, {
      stripUnknown: true,
    });
  };

  delete = async (req: Request) => {
    const rating = await ratingRepository.retrieve({ id: req.params.id });
    const user = await userRepository.retrieve({ id: req.decoded.id });

    if (!rating) {
      throw new ErrorHandler(404, "Rating not found");
    }

    if (user.id !== rating.user.id) {
      throw new ErrorHandler(401, "You must be the user to delete a rating");
    }

    await ratingRepository.delete(rating.id);
  };

  update = async (req: Request) => {
    const rating = await ratingRepository.retrieve({ id: req.params.id });
    const user = await userRepository.retrieve({ id: req.decoded.id });

    if (!rating) {
      throw new ErrorHandler(404, "Rating not found");
    }

    if (user.id !== rating.user.id) {
      throw new ErrorHandler(401, "You must be the user to update a rating");
    }

    await ratingRepository.update(rating.id, req.body);

    const updatedRating = await ratingRepository.retrieve({
      id: req.params.id,
    });

    return updatedRating;
  };
}

export default new RatingService();
