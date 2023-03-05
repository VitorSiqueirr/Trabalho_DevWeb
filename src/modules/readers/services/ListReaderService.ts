import { getCustomRepository } from "typeorm";
import Reader from "../typeorm/entities/Readers";
import ReadersRepository from "../typeorm/repositories/ReadersRepository";

export default class ListReaderService {
  public async execute(): Promise<Reader[]> {
    const readerRepository = getCustomRepository(ReadersRepository);
    const readers = await readerRepository.find();
    return readers;
  }
}
