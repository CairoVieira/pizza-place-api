import { Router, Request, Response } from "express";

const pizza = Router();

pizza.get("/", (request: Request, response: Response) => {
    response.send({
        mensagem: "Aqui é pizza",
    });
});

export { pizza };
