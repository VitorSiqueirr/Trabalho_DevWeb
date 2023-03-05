import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Reader from "../typeorm/entities/Readers";
import ReadersRepository from "../typeorm/repositories/ReadersRepository";

interface IRequest {
  id: string;
}

export default class ShowReaderService {
  public async execute({ id }: IRequest): Promise<Reader> {
    const readersRepository = getCustomRepository(ReadersRepository);
    const readers = await readersRepository.findById(id);
    console.log(readers);
    if (!readers) {
      throw new AppError("Reader not found!");
    }
    return readers;
  }
}
