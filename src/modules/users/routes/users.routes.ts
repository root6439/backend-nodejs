import { Segments, celebrate, Joi } from "celebrate";
import { UsersController } from "./../controller/UsersController";
import { Router } from "express";

const usersRouter = Router();
const controller = new UsersController();

usersRouter.get("/", controller.get);
usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  controller.post
);

export { usersRouter };
