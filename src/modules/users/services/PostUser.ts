import { UserRepository } from "./../typeorm/repositories/UserRepository";
import { User } from "./../typeorm/entities/User";
import { AppError } from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";

export class PostUser {
  public async execute(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const userRepo = getCustomRepository(UserRepository);

    const emailExists = await userRepo.findByEmail(email);

    if (emailExists) {
      throw new AppError("E-mail já está em uso.");
    }

    const user = userRepo.create({
      name,
      email,
      password,
    });

    await userRepo.save(user);

    return user;
  }
}
