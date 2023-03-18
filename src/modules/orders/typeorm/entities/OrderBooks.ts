import Book from "@modules/books/typeorm/entities/Book";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Order from "./Order";

@Entity("orders_books")
export default class OrderBooks {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @ManyToOne(() => Order, (order) => order.order_books)
  @JoinColumn({ name: "order_id" })
  order: Order;
  @ManyToOne(() => Book, (book) => book.order_books)
  @JoinColumn({ name: "book_id" })
  book: Book;
  @Column()
  order_id: string;
  @Column()
  book_id: string;
  @Column("decimal")
  price: number;
  @Column("int")
  quantity: number;
  @Column()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
