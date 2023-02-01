import { ProfileController } from "./../controller/ProfileController";
import { Segments, celebrate, Joi } from "celebrate";
import { Router } from "express";
import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";

const profileRouter = Router();
const controller = new ProfileController();

profileRouter.get("/", isAuthenticated, controller.get);
profileRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      actualPassword: Joi.string().min(6),
      newPassword: Joi.string().min(6).optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref("newPassword"))
        .when("newPassword", {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  isAuthenticated,
  controller.put
);

export { profileRouter };
