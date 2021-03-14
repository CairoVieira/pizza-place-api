import { Request, Response } from "express";

class BebidaController {
    async listar(request: Request, response: Response) {
        response.send({
            mensagem: "Aqui é bebida!!!",
        });
    }
}

export { BebidaController };
