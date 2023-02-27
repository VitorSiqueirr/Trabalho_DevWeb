import { Request, Response } from "express";
import CreateBookService from "../services/CreateBookService";
import DeleteBookService from "../services/DeleteBookService";
import ListBookService from "../services/ListBookService";
import ShowBookService from "../services/ShowBookService";
import UpdateBookService from "../services/UpdateBookService";

export default class BooksController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listBooks = new ListBookService();
    const books = await listBooks.execute();
    return response.json(books);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showBook = new ShowBookService();
    const book = await showBook.execute({ id });
    return response.json(book);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      author,
      edition,
      pages,
      publishing_company,
      genre,
      sub_genre,
      price,
      quantity,
      release_date,
    } = request.body;
    const createBook = new CreateBookService();
    const book = await createBook.execute({
      name,
      author,
      edition,
      pages,
      publishing_company,
      genre,
      sub_genre,
      price,
      quantity,
      release_date,
    });
    return response.json(book);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      author,
      edition,
      pages,
      publishing_company,
      genre,
      sub_genre,
      price,
      quantity,
      release_date,
    } = request.body;
    const updateBook = new UpdateBookService();
    const book = await updateBook.execute({
      id,
      name,
      author,
      edition,
      pages,
      publishing_company,
      genre,
      sub_genre,
      price,
      quantity,
      release_date,
    });
    return response.json(book);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteBook = new DeleteBookService();
    await deleteBook.execute({ id });
    return response.json([]);
  }
}
