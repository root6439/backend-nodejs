import { ProductsController } from "./../controller/ProductsController";
import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

const prodsRouter = Router();
const controller = new ProductsController();

// get all
prodsRouter.get("/", controller.get);

//get by id
prodsRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.getById
);

// post
prodsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2),
      quantity: Joi.number().required(),
    },
  }),
  controller.post
);

// put
prodsRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2),
      quantity: Joi.number().required(),
    },
  }),
  controller.put
);

// delete
prodsRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  controller.delete
);

export default prodsRouter;
