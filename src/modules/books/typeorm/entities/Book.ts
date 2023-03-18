import OrderBooks from "@modules/orders/typeorm/entities/OrderBooks";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("books")
export default class Book {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @OneToMany(() => OrderBooks, (order_books) => order_books.book)
  order_books: OrderBooks[];
  @Column()
  name: string;
  @Column()
  author: string;
  @Column()
  edition: number;
  @Column("int")
  pages: number;
  @Column()
  publishing_company: string;
  @Column()
  genre: string;
  @Column()
  sub_genre: string;
  @Column("decimal")
  price: number;
  @Column("int")
  quantity: number;
  //foto
  @CreateDateColumn()
  release_date: Date;
  @CreateDateColumn()
  created_at: Date;
  @CreateDateColumn()
  updated_at: Date;
}
