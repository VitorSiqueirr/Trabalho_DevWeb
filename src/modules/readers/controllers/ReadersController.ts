import { Request, Response } from "express";
import CreateReaderService from "../services/CreateReaderService";
import DeleteReaderService from "../services/DeleteReaderService";
import ListReaderService from "../services/ListReaderService";
import ShowReaderService from "../services/ShowReaderService";
import UpdateReaderservice from "../services/UpdateReaderService";

export default class ReaderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listReader = new ListReaderService();
    const readers = await listReader.execute();
    return response.json(readers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showReader = new ShowReaderService();
    const readers = await showReader.execute({ id });
    return response.json(readers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createReader = new CreateReaderService();
    const readers = await createReader.execute({ name, email });
    return response.json(readers);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;
    const updateReader = new UpdateReaderservice();
    const readers = await updateReader.execute({ id, name, email });
    return response.json(readers);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteReader = new DeleteReaderService();
    await deleteReader.execute({ id });
    return response.json();
  }
}
