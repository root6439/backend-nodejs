import { ResetPassword } from "./../services/ResetPassword";
import { User } from "../typeorm/entities/User";
import { Request, Response } from "express";

export class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response<User>> {
    const { password, token } = req.body;

    const resetPassword = new ResetPassword();

    await resetPassword.execute(token, password);

    return res.json(204).json();
  }
}
