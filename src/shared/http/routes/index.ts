import booksRouter from "@modules/books/routes/books.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import usersRouter from "@modules/users/routes/users.routes";
import readerRouter from "@modules/readers/routes/reader.routes";
import { Router } from "express";
import ordersRouter from "@modules/orders/routes/orders.routes";

const routes = Router();

routes.use("/books", booksRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/password", passwordRouter);
routes.use("/profile", profileRouter);
routes.use("/readers", readerRouter);
routes.use("/orders", ordersRouter);

export default routes;
