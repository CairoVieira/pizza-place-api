import { Request, Response, Router } from "express";
import { PedidoController } from "../controllers/PedidoController";
import { Pedido } from "../models/Pedido";

const pedido = Router();
const pedidoController = new PedidoController();

pedido.get("/", async (request: Request, response: Response) => {
	const result = await pedidoController.listar();

	if (!(result instanceof Array)) {
		return response.status(500).json(result);
	}
	return response.status(200).json(result);
});

pedido.get("/:id", async (request: Request, response: Response) => {
	const { id } = request.params;
	const result = await pedidoController.listarUm(id);

	if (!(result instanceof Pedido)) {
		return response.status(500).json(result);
	}
	return response.status(200).json(result);
});

pedido.get("/ultimo/:id", async (request: Request, response: Response) => {
	const { id } = request.params;
	const result = await pedidoController.listarUltimoPedido(id);

	if (!(result instanceof Pedido)) {
		return response.status(500).json(result);
	}
	return response.status(200).json(result);
});

pedido.post("/", async (request: Request, response: Response) => {
	const { cliente_id, endereco_id, valor, metodo_pagamento, itens_pedido } =
		request.body;

	const result = await pedidoController.salvar(
		cliente_id,
		endereco_id,
		valor,
		metodo_pagamento,
		itens_pedido
	);

	if (!(result instanceof Pedido)) {
		return response.status(500).json(result);
	}
	return response.status(201).json(result);
});

pedido.put("/", async (request: Request, response: Response) => {
	const {
		id,
		cliente_id,
		endereco_id,
		valor,
		metodo_pagamento,
		itens_pedido,
	} = request.body;

	const result = await pedidoController.atualizar(
		id,
		cliente_id,
		endereco_id,
		valor,
		metodo_pagamento,
		itens_pedido
	);

	if (!(result instanceof Pedido)) {
		return response.status(500).json(result);
	}
	return response.status(201).json(result);
});

pedido.delete("/:id", async (request: Request, response: Response) => {
	const { id } = request.params;
	const result = await pedidoController.deletar(id);

	if (result !== true) {
		return response.status(500).json(result);
	}
	return response.status(200).json(result);
});

export { pedido };
