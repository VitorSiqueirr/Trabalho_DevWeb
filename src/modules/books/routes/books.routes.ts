import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import BooksController from "../controllers/BooksController";

const booksRouter = Router();
const booksConstroller = new BooksController();

booksRouter.get("/", booksConstroller.index);
booksRouter.get("/:id",celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}),booksConstroller.show
);
booksRouter.post("/",celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        author: Joi.string().required(),
        edition: Joi.number().min(1).max(50).required(),
        pages: Joi.number().min(1).max(10000).required(),
        publishing_company: Joi.string().required(),
        genre: Joi.string().required(),
        sub_genre: Joi.string().required(),
        price: Joi.number().min(0).precision(2).required(),
        quantity: Joi.number().min(1).max(50).required(),
        release_date: Joi.date().required(),
    }
}),booksConstroller.create
);
booksRouter.put("/:id",celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
        name: Joi.string().required(),
        author: Joi.string().required(),
        edition: Joi.number().min(1).max(50).required(),
        pages: Joi.number().min(1).max(10000).required(),
        publishing_company: Joi.string().required(),
        genre: Joi.string().required(),
        sub_genre: Joi.string().required(),
        price: Joi.number().min(0).precision(2).required(),
        quantity: Joi.number().min(1).max(50).required(),
        release_date: Joi.date().required(),
    }
}),booksConstroller.update
);
booksRouter.delete("/:id", celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), booksConstroller.delete
);

export default booksRouter;

//Lembrar de importar na router->index
