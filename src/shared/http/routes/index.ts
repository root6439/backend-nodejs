import { Router } from "express";
import prodsRouter from "../../../modules/products/routes/products.routes";
import { passwordRouter } from "../../../modules/users/routes/password.routes";
import { usersRouter } from "../../../modules/users/routes/users.routes";

const routes = Router();

routes.use("/products", prodsRouter);
routes.use("/users", usersRouter);
routes.use("/password", passwordRouter);

export default routes;
