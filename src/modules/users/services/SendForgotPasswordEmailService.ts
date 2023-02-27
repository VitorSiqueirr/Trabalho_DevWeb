import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokenRepository";
import EtherealMail from "@config/mail/EtherealMail";
import path from "path";

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs"
    );
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User does not exist.");
    }
    const { token } = await userTokensRepository.generate(user.id);
    await EtherealMail.sendMain({
      to: { name: user.name, email: user.email },
      subject: "[API Vendas] - Recuperação de Senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3333/reset_password?token=${token}`,
        },
      },
    });
  }
}
