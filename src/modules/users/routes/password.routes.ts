import { ResetPasswordController } from "./../controller/ResetPasswordController";
import { Joi, Segments, celebrate } from "celebrate";
import { ForgotPasswordController } from "./../controller/ForgotPasswordController";
import { Router } from "express";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPassword = new ResetPasswordController();

passwordRouter.use(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create
);

passwordRouter.use(
  "/reset",
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      password: Joi.string().min(6).required(),
      password_confirmation: Joi.string()
        .min(6)
        .valid(Joi.ref("password"))
        .required(),
    },
  }),
  resetPassword.create
);

export { passwordRouter };
