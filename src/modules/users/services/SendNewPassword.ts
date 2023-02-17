import { EtherealMail } from "./../../../config/mail/EtherealMail";
import { AppError } from "./../../../shared/errors/AppError";
import { UserRepository } from "./../typeorm/repositories/UserRepository";
import { UserTokenRepository } from "./../typeorm/repositories/UserTokenRepository";
import { getCustomRepository } from "typeorm";
import path from "path";

export class SendNewPassword {
  public async execute(email: string): Promise<void> {
    const tokenRepo = getCustomRepository(UserTokenRepository);
    const userRepo = getCustomRepository(UserRepository);

    const user = await userRepo.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não cadastrado.", 401);
    }

    const token = await tokenRepo.generateToken(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs"
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: "[API Vendas] Recuperação de senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token.token}`,
        },
      },
    });
  }
}
