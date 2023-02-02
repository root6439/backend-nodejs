import { OrderController } from "./../controllers/OrderController";
import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";

const ordersRouter = Router();
const controller = new OrderController();

ordersRouter.use(isAuthenticated);

ordersRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.getById
);

ordersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  controller.post
);

export { ordersRouter };
