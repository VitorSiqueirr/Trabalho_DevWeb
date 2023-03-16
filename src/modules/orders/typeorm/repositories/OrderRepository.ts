import Reader from "@modules/readers/typeorm/entities/Readers";
import { Entity, EntityRepository, Repository } from "typeorm";
import Order from "../entities/Order";




interface IBook{
    book_id: string;
    price: number;
    quantity: number;
}

interface IRequest{
    reader: Reader;
    books: IBook[];
}

@EntityRepository(Order)
export default class OrderRepository extends Repository<Order>{

    public async findById(id: string): Promise <Order | undefined>{
        const order = this.findOne(id, 
            {relations: ['order_books', 'reader']});
        return order;
    }

    public async createOrder({reader, books}: IRequest): Promise<Order>{
        const order = this.create({reader, order_books: books});
        return order;
    }
} 