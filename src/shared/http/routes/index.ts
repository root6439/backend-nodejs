import { Router } from "express";
import { customerRouter } from "../../../modules/customers/routes/customer.routes";
import prodsRouter from "../../../modules/products/routes/products.routes";
import { passwordRouter } from "../../../modules/users/routes/password.routes";
import { profileRouter } from "../../../modules/users/routes/profile.routes";
import { usersRouter } from "../../../modules/users/routes/users.routes";
import { ordersRouter } from "../../../modules/orders/routes/orders.routes";
const routes = Router();

routes.use("/products", prodsRouter);
routes.use("/users", usersRouter);
routes.use("/password", passwordRouter);
routes.use("/profile", profileRouter);
routes.use("/customers", customerRouter);
routes.use("/orders", ordersRouter);

export default routes;
