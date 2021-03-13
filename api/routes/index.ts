import { Router, Request, Response } from "express";

const router = Router();

router.get("/health", (request: Request, response: Response) => {
    response.send({
        mensagem: "Servidor online!",
    });
});

export { router };
