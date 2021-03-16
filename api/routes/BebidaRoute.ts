import { Router, Request, Response} from "express";
import { BebidaController } from "../controllers/BebidaController";
import { Bebida } from "../models/Bebida";

const bebida = Router();
const bebidaController = new BebidaController();

bebida.get("/", async (request: Request, response: Response) => {
    const result = await bebidaController.listar();

    if (!(result instanceof Array)) {
        return response.status(500).json(result);
    }
    return response.status(200).json(result);
});

bebida.get("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    const result = await bebidaController.listarUm(id);

    if (!(result instanceof Bebida)) {
        return response.status(500).json(result);
    }
    return response.status(200).json(result);
});

bebida.post("/", async (request: Request, response: Response) => {
    const { nome, valor, categoria } = request.body;

    const result = await bebidaController.salvar(nome, valor, categoria);

    if (!(result instanceof Bebida)) {
        return response.status(500).json(result);
    }
    return response.status(201).json(result);
});

bebida.put("/", async (request: Request, response: Response) => {
    const { id, nome, valor, categoria } = request.body;

    const result = await bebidaController.atualizar(id, nome, valor, categoria);

    if (!(result instanceof Bebida)) {
        return response.status(500).json(result);
    }
    return response.status(201).json(result);
});

bebida.delete("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    const result = await bebidaController.deletar(id);

    if (result !== true) {
        return response.status(500).json(result);
    }
    return response.status(200).json(result);
});

export { bebida };
