import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Book from "../typeorm/entities/Book";
import BookRepository from "../typeorm/repositories/BookRepository";

export default class ListBookService {
  public async execute(): Promise<Book[]> {
    const bookRepository = getCustomRepository(BookRepository);

    const books = await bookRepository.find();
    return books;
  }
}
