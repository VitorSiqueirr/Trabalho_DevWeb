import { EntityRepository, Repository } from "typeorm";
import Book from "../entities/Book";

@EntityRepository(Book)
export default class BookRepository extends Repository<Book> {
  public async findByName(name: string): Promise<Book | undefined> {
    const book = await this.findOne({
      where: { name },
    });
    return book;
  }
}
