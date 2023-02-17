import { AppError } from "./../../../shared/errors/AppError";
import { UpdateAvatar } from "./../services/UpdateAvatar";
import { User } from "../typeorm/entities/User";
import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export class UsersAvatarController {
  public async put(req: Request, res: Response): Promise<Response<User>> {
    const updateAvatar = new UpdateAvatar();

    const file: File = (req.files as Array<File>)[0];

    if (!file) {
      throw new AppError("Não foi passado nenhum arquivo.");
    }

    const user = await updateAvatar.execute(req.user.id, file.originalname);
    return res.json(instanceToInstance(user));
  }
}
