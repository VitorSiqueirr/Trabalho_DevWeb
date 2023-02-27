import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import BookRepository from "../typeorm/repositories/BookRepository";

interface IRequest {
  id: string;
}

export default class DeleteBookService {
  public async execute({ id }: IRequest): Promise<void> {
    const bookRepository = getCustomRepository(BookRepository);
    const book = await bookRepository.findOne(id);
    if (!book) {
      throw new AppError("Book not found");
    }
    await bookRepository.remove(book);
  }
}
