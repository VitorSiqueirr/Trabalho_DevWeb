import fs from "fs";
import uploadConfig from "@config/upload";
import User from "../typeorm/entities/User";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";
import path from "path";

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new AppError("User not found!");
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        // remove o arquivo do servidor
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;
    await userRepository.save(user);
    return user;
  }
}
