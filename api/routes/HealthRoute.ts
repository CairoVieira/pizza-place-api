import { Router, Request, Response } from "express";

const health = Router();

health.get("/", (request: Request, response: Response) => {
    response.send({
        mensagem: "Servidor online!",
    });
});

export { health };
