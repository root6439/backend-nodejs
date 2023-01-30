import { Segments, celebrate, Joi } from "celebrate";
import { UsersController } from "./../controller/UsersController";
import { Router } from "express";
import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";

const usersRouter = Router();
const controller = new UsersController();

usersRouter.get("/", isAuthenticated, controller.get);
usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  controller.post
);
usersRouter.post(
  "/login",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  controller.authenticate
);

export { usersRouter };
