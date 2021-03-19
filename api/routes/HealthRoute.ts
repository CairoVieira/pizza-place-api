import { Request, Response, Router } from "express";

const health = Router();

health.get("/", (request: Request, response: Response) => {
    response.send({
        mensagem: "Servidor online!",
    });
});

export { health };
