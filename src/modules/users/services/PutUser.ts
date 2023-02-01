import { UserRepository } from "../typeorm/repositories/UserRepository";
import { User } from "../typeorm/entities/User";
import { AppError } from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { compare, hash } from "bcryptjs";

export class PutUser {
  public async execute(
    userId: string,
    name: string,
    email: string,
    newPassword?: string,
    actualPassword?: string
  ): Promise<User> {
    const userRepo = getCustomRepository(UserRepository);

    const user = await userRepo.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    const userUpdateEmail = await userRepo.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id != userId) {
      throw new AppError("Já existe um usuário com o mesmo e-mail.");
    }

    if (newPassword && !actualPassword) {
      throw new AppError("Obrigatório informar a senha atual.");
    }

    if (newPassword && actualPassword) {
      const checkOldPassword = await compare(actualPassword, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha está errada.", 401);
      }

      user.password = await hash(newPassword, 8);
    }

    user.email = email;
    user.name = name;

    await userRepo.save(user);

    return user;
  }
}
