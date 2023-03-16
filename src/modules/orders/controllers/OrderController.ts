import { Request, Response } from "express";
import CreateOrderService from "../services/CreateOrderService";
import ShowOrderService from "../services/ShowOrderService";



export default class OrdersController{
    constructor(){}

    public async show(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;
        const showOrder = new ShowOrderService();
        const order = await showOrder.execute({id});
        return response.json(order);
    }

    public async create(request: Request, response: Response): Promise<Response>{
        const {reader_id, books} = request.body;
        const createOrder = new CreateOrderService();
        const order = await createOrder. execute({reader_id, books});
        return response.json(order);
    }
}