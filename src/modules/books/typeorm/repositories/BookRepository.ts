import { EntityRepository, In, Repository } from "typeorm";
import Book from "../entities/Book";

interface IFindBooks{
  id: string;
}

@EntityRepository(Book)
export default class BookRepository extends Repository<Book> {
  public async findByName(name: string): Promise<Book | undefined> {
    const book = await this.findOne({
      where: { name },
    });
    return book;
  }

  public async findAllByIds(books: IFindBooks[]): Promise<Book[]>{
    const booksIds = books.map(book => book.id);
    const existsBooks = await this.find({
      where:{
        id: In(booksIds),
      }
    });
    return existsBooks;
  }

}
