import { Router, Request, Response } from "express";
import { object } from "yup/lib/locale";
import { IngredienteController } from "../controllers/IngredienteController";
import { Ingrediente } from "../models/Ingrediente";

const ingrediente = Router();
const ingredienteController = new IngredienteController();

ingrediente.get("/", async (request: Request, response: Response) => {
    const result = await ingredienteController.listar();

    if (!(result instanceof Array)) {
        return response.status(500).json(result);
    }
    return response.status(200).json(result);
});

ingrediente.get("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    const result = await ingredienteController.listarUm(id);

    if (!(result instanceof Ingrediente)) {
        return response.status(500).json(result);
    }
    return response.status(200).json(result);
});

ingrediente.post("/", async (request: Request, response: Response) => {
    const { nome, valor, categoria } = request.body;

    const result = await ingredienteController.salvar(nome, valor, categoria);

    if (!(result instanceof Ingrediente)) {
        return response.status(500).json(result);
    }
    return response.status(201).json(result);
});

ingrediente.put("/", async (request: Request, response: Response) => {
    const { id, nome, valor, categoria } = request.body;

    const result = await ingredienteController.atualizar(
        id,
        nome,
        valor,
        categoria
    );

    if (!(result instanceof Ingrediente)) {
        return response.status(500).json(result);
    }
    return response.status(201).json(result);
});

ingrediente.delete("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    const result = await ingredienteController.deletar(id);

    if (result !== true) {
        return response.status(500).json(result);
    }
    return response.status(200).json(result);
});

export { ingrediente };
