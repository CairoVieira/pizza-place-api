import { Request, Response, Router } from "express";
import { FavoritoController } from "../controllers/FavoritoController";
import { Favorito } from "../models/Favorito";

const favorito = Router();
const favoritoController = new FavoritoController();

favorito.get("/", async (request: Request, response: Response) => {
    const result = await favoritoController.listar();

    if (!(result instanceof Array)) {
        return response.status(500).json(result);
    }
    return response.status(200).json(result);
});

favorito.get("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    const result = await favoritoController.listarUm(id);

    if (!(result instanceof Favorito)) {
        return response.status(500).json(result);
    }
    return response.status(200).json(result);
});

favorito.post("/", async (request: Request, response: Response) => {
    const { pizza_id, bebida_id, cliente_id } = request.body;

    const result = await favoritoController.salvar(
        pizza_id,
        bebida_id,
        cliente_id
    );

    if (!(result instanceof Favorito)) {
        return response.status(500).json(result);
    }
    return response.status(201).json(result);
});

favorito.put("/", async (request: Request, response: Response) => {
    const { id, pizza_id, bebida_id, cliente_id } = request.body;

    const result = await favoritoController.atualizar(
        id,
        pizza_id,
        bebida_id,
        cliente_id
    );

    if (!(result instanceof Favorito)) {
        return response.status(500).json(result);
    }
    return response.status(201).json(result);
});

favorito.delete("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    const result = await favoritoController.deletar(id);

    if (result !== true) {
        return response.status(500).json(result);
    }
    return response.status(200).json(result);
});

export { favorito };
