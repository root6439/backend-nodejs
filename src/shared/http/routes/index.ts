import { Router } from "express";
import prodsRouter from "../../../modules/products/routes/products.routes";

const routes = Router();

routes.use("/products", prodsRouter);

routes.get("/", (req, res) => {
  return res.json({ message: "Olá" });
});

export default routes;
