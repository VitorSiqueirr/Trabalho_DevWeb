import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Reader from "../typeorm/entities/Readers";
import ReadersRepository from "../typeorm/repositories/ReadersRepository";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateReaderservice {
  public async execute({ id, name, email }: IRequest): Promise<Reader> {
    const readerRepository = getCustomRepository(ReadersRepository);
    const reader = await readerRepository.findById(id);
    if (!reader) {
      throw new AppError("reader not found!");
    }
    const readerExists = await readerRepository.findByEmail(email);
    if (readerExists && email !== reader.email) {
      throw new AppError("There is already one user with this email");
    }
    reader.name = name;
    reader.email = email;
    await readerRepository.save(reader);
    return reader;
  }
}
