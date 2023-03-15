import OrderBooks from "@modules/orders/typeorm/entities/OrderBooks";
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
  @Entity("readers")
  export default class Reader {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @CreateDateColumn()
    created_at: Date;
    @CreateDateColumn()
    updated_at: Date;
  }
  