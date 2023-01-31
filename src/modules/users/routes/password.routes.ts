import { Joi, Segments, celebrate } from "celebrate";
import { ForgotPasswordController } from "./../controller/ForgotPasswordController";
import { Router } from "express";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.use(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create
);

export { passwordRouter };
