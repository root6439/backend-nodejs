import { SendNewPassword } from "./../services/SendNewPassword";
import { User } from "../typeorm/entities/User";
import { Request, Response } from "express";

export class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response<User>> {
    const email: string = req.body.email;

    const sendNewPassword = new SendNewPassword();

    await sendNewPassword.execute(email);

    return res.status(204).json();
  }
}
