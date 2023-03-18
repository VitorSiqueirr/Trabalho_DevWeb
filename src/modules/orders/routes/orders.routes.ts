import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import OrderController from "../controllers/OrderController";

const orderRouter = Router();
const ordersController = new OrderController();

orderRouter.use(isAuthenticated);

orderRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  ordersController.show
);

orderRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      reader_id: Joi.string().required(),
      books: Joi.required(),
    },
  }),
  ordersController.create
);

export default orderRouter;
