import { Router } from "express";
import prodsRouter from "../../../modules/products/routes/products.routes";
import { usersRouter } from "../../../modules/users/routes/users.routes";

const routes = Router();

routes.use("/products", prodsRouter);
routes.use("/users", usersRouter);

routes.get("/", (req, res) => {
  return res.json({ message: "Olá" });
});

export default routes;
