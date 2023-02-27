import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UserAvatarController {
  public async update(request: Request, reponse: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();
    const user = updateAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file?.filename as string,
    });
    return reponse.json(user);
  }
}
