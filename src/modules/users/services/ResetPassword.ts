import { AppError } from "../../../shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UserRepository";
import { UserTokenRepository } from "../typeorm/repositories/UserTokenRepository";
import { getCustomRepository } from "typeorm";
import { addHours, isAfter } from "date-fns";
import { hash } from "bcryptjs";

export class ResetPassword {
  public async execute(token: string, password: string): Promise<void> {
    const tokenRepo = getCustomRepository(UserTokenRepository);
    const userRepo = getCustomRepository(UserRepository);

    const userToken = await tokenRepo.findByToken(token);

    if (!userToken) {
      throw new AppError("O token não existe.");
    }

    const user = await userRepo.findById(userToken.user_id);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    const dateCompare = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), dateCompare)) {
      throw new AppError("Token expirado");
    }

    user.password = await hash(password, 8);

    await userRepo.save(user);
  }
}
