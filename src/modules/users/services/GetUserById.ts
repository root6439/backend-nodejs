import { AppError } from "../../../shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UserRepository";
import { User } from "../typeorm/entities/User";
import { getCustomRepository } from "typeorm";

export class GetUserById {
  public async execute(userId: string): Promise<User> {
    const userRepo = getCustomRepository(UserRepository);

    const user = await userRepo.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    return user;
  }
}
