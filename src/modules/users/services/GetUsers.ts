import { UserRepository } from "./../typeorm/repositories/UserRepository";
import { User } from "./../typeorm/entities/User";
import { getCustomRepository } from "typeorm";

export class GetUsers {
  public async execute(): Promise<User[]> {
    const userRepo = getCustomRepository(UserRepository);
    return await userRepo.find();
  }
}
