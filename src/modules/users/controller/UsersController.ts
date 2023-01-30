import { PostUser } from "./../services/PostUser";
import { GetUsers } from "./../services/GetUsers";
import { User } from "./../typeorm/entities/User";
import { Request, Response } from "express";

export class UsersController {
  public async get(req: Request, res: Response): Promise<Response<User[]>> {
    const listUsers = new GetUsers();
    const users = await listUsers.execute();
    return res.json(users);
  }

  public async post(req: Request, res: Response): Promise<Response<User>> {
    const { name, email, password } = req.body;
    const postUser = new PostUser();
    const user = await postUser.execute(name, email, password);
    return res.status(201).json(user);
  }
}
