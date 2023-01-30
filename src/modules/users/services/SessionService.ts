import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../../../config/auth";
import { getCustomRepository } from "typeorm";
import { AppError } from "../../../shared/errors/AppError";
import { User } from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UserRepository";

interface AuthenticationResponse {
  user: User;
  token: string;
}

export class SessionService {
  public async execute(
    email: string,
    password: string
  ): Promise<AuthenticationResponse> {
    const userRepo = getCustomRepository(UserRepository);

    const user = await userRepo.findByEmail(email);

    if (!user) {
      throw new AppError("E-mail inválido.", 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError("Senha inválida.", 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}
