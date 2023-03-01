import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Reader from "../typeorm/entities/Readers";
import ReadersRepository from "../typeorm/repositories/ReadersRepository";

interface IRequest {
  name: string;
  email: string;
}

export default class CreateReaderService {
  public async execute({ name, email }: IRequest): Promise<Reader> {
    const readersRepository = getCustomRepository(ReadersRepository);
    const emailExists = await readersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError("Email address already used!");
    }
    const reader = await readersRepository.create({
      name,
      email,
    });
    await readersRepository.save(reader);
    return reader;
  }
}
