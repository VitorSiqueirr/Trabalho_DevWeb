import BookRepository from "@modules/books/typeorm/repositories/BookRepository";
import ReadersRepository from "@modules/readers/typeorm/repositories/ReadersRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrderRepository from "../typeorm/repositories/OrderRepository";


interface IBook{
    id: string;
    quantity: number;
}

interface IRequest{
    reader_id: string;
    books: IBook[];
}

export default class CreateOrderService{
    public async execute({reader_id, books}: IRequest): Promise<Order>{
        const ordersRepository = getCustomRepository(OrderRepository);
        const readersRepository = getCustomRepository(ReadersRepository);
        const booksRepository = getCustomRepository(BookRepository);

        const readerExists = await readersRepository.findById(reader_id);
        if(!readerExists){
            throw new AppError('Could not find any reader with the given ids.');
        }

        const existsBooks = await booksRepository.findAllByIds(books);
        if(!existsBooks.length){
            throw new AppError('Could not find any reader with the given ids.');
        }

        const existsBooksIds = existsBooks.map((book) => book.id);
        const checkInexistentBooks = books.filter(
            book => !existsBooksIds.includes(book.id)
        );
        if(!existsBooksIds.length){
            throw new AppError(`Could not find book ${checkInexistentBooks[0].id}.`);
        }

        const quantityAvailable = books.filter(
            book => existsBooks.filter(
                bok => bok.id === book.id
            )[0].quantity < book.quantity
        );
        if(quantityAvailable.length){
            throw new AppError(`The quantity ${quantityAvailable[0].id} is not available for ${quantityAvailable[0].id}.`);
        }

        const serializerBooks = books.map(book => ({
            book_id: book.id,
            quantity: book.quantity,
            price: existsBooks.filter(bok => bok.id === book.id)[0].price
        }));

        const order = await ordersRepository.createOrder({
            reader: readerExists,
            books: serializerBooks
        });

        const {order_books} = order;
        const updateBookQuantity = order_books.map(book => ({
            id: book.book_id,
            quantity: existsBooks.filter(b => b.id === book.book_id)[0].quantity - book.quantity
        }));

        await booksRepository.save(updateBookQuantity);
        return order;
    }
}