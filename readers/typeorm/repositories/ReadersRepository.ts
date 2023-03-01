import { EntityRepository, Repository } from "typeorm";
import Readers from "../entities/Readers";
@EntityRepository(Readers)
export default class ReaderssRepository extends Repository<Readers> {
  public async findByName(name: string): Promise<Readers | undefined> {
    const readers = await this.findOne({
      where: { name },
    });
    return readers;
  }
  public async findById(id: string): Promise<Readers | undefined> {
    const reader = await this.findOne({
      where: { id },
    });
    return reader;
  }
  public async findByEmail(email: string): Promise<Readers | undefined> {
    const reader = await this.findOne({
      where: { email },
    });
    return reader;
  }
}
