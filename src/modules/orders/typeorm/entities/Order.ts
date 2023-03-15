import Reader from "@modules/readers/typeorm/entities/Readers";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrderBooks from "./OrderBooks";


@Entity('orders')
export default class Order{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ManyToOne(() => Reader)
    @JoinColumn({name: 'reader_id'})
    reader: Reader;
    @OneToMany(() => OrderBooks, order_books => order_books.order, {cascade: true})
    order_books: OrderBooks[];
    @Column()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}