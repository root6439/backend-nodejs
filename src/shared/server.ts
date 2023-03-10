import "reflect-metadata";
import "dotenv/config";
import { AppError } from "./errors/AppError";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { errors } from "celebrate";
import routes from "./http/routes/index";
import "./typeorm";
import uploadConfig from "../config/upload";
import { pagination } from "typeorm-pagination";

const app = express();

app.use(cors());

app.use(express.json());
app.use(pagination);
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.log(error);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(3333, () => {
  console.log("Server on");
});
