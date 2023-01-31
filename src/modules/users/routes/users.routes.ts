import { UsersAvatarController } from "./../controller/UsersAvatarController";
import { Segments, celebrate, Joi } from "celebrate";
import { UsersController } from "./../controller/UsersController";
import { Router } from "express";
import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";
import uploadConfig from "../../../config/upload";
import multer from "multer";

const usersRouter = Router();
const controller = new UsersController();
const avatarController = new UsersAvatarController();
const upload = multer(uploadConfig);

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
usersRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.any(),
  avatarController.put
);

export { usersRouter };
