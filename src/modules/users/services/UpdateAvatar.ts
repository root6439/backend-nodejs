import { AppError } from "./../../../shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UserRepository";
import { User } from "../typeorm/entities/User";
import { getCustomRepository } from "typeorm";
import path from "path";
import uploadConfig from "../../../config/upload";
import fs from "fs";

export class UpdateAvatar {
  public async execute(userId: string, avatarFileName: string): Promise<User> {
    const userRepo = getCustomRepository(UserRepository);

    const user = await userRepo.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await userRepo.save(user);

    return user;
  }
}
