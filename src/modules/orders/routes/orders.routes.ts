import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import OrdersController from "../controllers/OrderController";


const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {id: Joi.string().uuid().required()}
}), ordersController.show);

ordersRouter.post('/', celebrate({
    [Segments.BODY]: {
        reader_id: Joi.string().required(),
        books: Joi.required()
    }
}), ordersController.create);

export default ordersRouter;