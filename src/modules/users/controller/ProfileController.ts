import { PutUser } from "./../services/PutUser";
import { GetUserById } from "./../services/GetUserById";
import { User } from "./../typeorm/entities/User";
import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";

export class ProfileController {
  public async get(req: Request, res: Response): Promise<Response<User[]>> {
    const getUser = new GetUserById();
    const user = await getUser.execute(req.user.id);
    return res.json(instanceToInstance(user));
  }

  public async put(req: Request, res: Response): Promise<Response<User>> {
    const { name, email, newPassword, actualPassword } = req.body;
    const putUser = new PutUser();
    const user = await putUser.execute(
      req.user.id,
      name,
      email,
      newPassword,
      actualPassword
    );
    return res.json(instanceToInstance(user));
  }
}
