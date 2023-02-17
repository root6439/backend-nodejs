import { SessionService } from "./../services/SessionService";
import { PostUser } from "./../services/PostUser";
import { GetUsers } from "./../services/GetUsers";
import { User } from "./../typeorm/entities/User";
import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";

export class UsersController {
  public async get(req: Request, res: Response): Promise<Response<User[]>> {
    const listUsers = new GetUsers();
    const users = await listUsers.execute();
    return res.json(instanceToInstance(users));
  }

  public async post(req: Request, res: Response): Promise<Response<User>> {
    const { name, email, password } = req.body;
    const postUser = new PostUser();
    const user = await postUser.execute(name, email, password);
    return res.status(201).json(instanceToInstance(user));
  }

  public async authenticate(
    req: Request,
    res: Response
  ): Promise<Response<User>> {
    const { email, password } = req.body;
    const sessionService = new SessionService();
    const user = await sessionService.execute(email, password);
    return res.json(instanceToInstance(user));
  }
}
