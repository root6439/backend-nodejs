import { Joi } from "celebrate";
import { Segments } from "celebrate";
import { celebrate } from "celebrate";
import { CustomersController } from "./../controllers/CustomersController";
import { Router } from "express";
import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";

const customerRouter = Router();
const controller = new CustomersController();

customerRouter.use(isAuthenticated);

customerRouter.get("/", controller.get);
customerRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.getById
);
customerRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  controller.post
);
customerRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  controller.put
);
customerRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.delete
);

export { customerRouter };
