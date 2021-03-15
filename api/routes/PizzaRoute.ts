import { Router, Request, Response } from "express";
import { PizzaController } from "../controllers/PizzaController";
import { Pizza } from "../models/Pizza";

const pizza = Router();
const pizzaController = new PizzaController();

pizza.get("/", async (request: Request, response: Response) => {
    const result = await pizzaController.listar();

    if (!(result instanceof Array)) {
        return response.status(500).json(result);
    }
    return response.status(200).json(result);
});

pizza.get("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    const result = await pizzaController.listarUm(id);

    if (!(result instanceof Pizza)) {
        return response.status(500).json(result);
    }
    return response.status(200).json(result);
});

pizza.post("/", async (request: Request, response: Response) => {
    const { nome, itens_pizza } = request.body;

    const result = await pizzaController.salvar(nome, itens_pizza);

    if (!(result instanceof Pizza)) {
        return response.status(500).json(result);
    }
    return response.status(201).json(result);
});

pizza.put("/", async (request: Request, response: Response) => {
    const { id, nome, valor, itens_pizza } = request.body;

    const result = await pizzaController.atualizar(
        id,
        nome,
        valor,
        itens_pizza
    );

    if (!(result instanceof Pizza)) {
        return response.status(500).json(result);
    }
    return response.status(201).json(result);
});

export { pizza };
