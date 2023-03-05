import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import ReadersRepository from "../typeorm/repositories/ReadersRepository";

interface IRequest {
  id: string;
}

export default class DeleteReaderService {
  public async execute({ id }: IRequest): Promise<void> {
    const readerRepository = getCustomRepository(ReadersRepository);
    const reader = await readerRepository.findById(id);

    if (!reader) {
      throw new AppError("Reader not found!");
    }
    await readerRepository.remove(reader);
  }
}
