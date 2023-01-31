import { AppError } from "./../../../shared/errors/AppError";
import { UserRepository } from "./../typeorm/repositories/UserRepository";
import { UserTokenRepository } from "./../typeorm/repositories/UserTokenRepository";
import { getCustomRepository } from "typeorm";

export class SendNewPassword {
  public async execute(email: string): Promise<void> {
    const tokenRepo = getCustomRepository(UserTokenRepository);
    const userRepo = getCustomRepository(UserRepository);

    const user = await userRepo.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não cadastrado.", 401);
    }

    const token = await tokenRepo.generateToken(user.id);

    console.log(token);
  }
}
