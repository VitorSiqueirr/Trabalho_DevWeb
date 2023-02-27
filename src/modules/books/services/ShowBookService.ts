import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Book from "../typeorm/entities/Book";
import BookRepository from "../typeorm/repositories/BookRepository";

interface IRequest {
  id: string;
}

export default class ShowBookServicee {
  public async execute({ id }: IRequest): Promise<Book> {
    const bookRepository = getCustomRepository(BookRepository);

    const book = await bookRepository.findOne(id);
    if (!book) {
      throw new AppError("Book not found");
    }
    return book;
  }
}
