import { Request, Response, Router } from "express";
import { ClienteController } from "../controllers/ClienteController";
import { Cliente } from "../models/Cliente";

const cliente = Router();
const clienteController = new ClienteController();

cliente.get("/", async (request: Request, response: Response) => {
	const result = await clienteController.listar();

	if (!(result instanceof Array)) {
		return response.status(500).json(result);
	}
	return response.status(200).json(result);
});

cliente.get("/:id", async (request: Request, response: Response) => {
	const { id } = request.params;
	const result = await clienteController.listarUm(id);

	if (!(result instanceof Cliente)) {
		return response.status(500).json(result);
	}
	return response.status(200).json(result);
});

cliente.get("/pizzas/:id", async (request: Request, response: Response) => {
	const { id } = request.params;
	const result = await clienteController.listaPizzasCliente(id);

	if (!(result instanceof Array)) {
		return response.status(500).json(result);
	}
	return response.status(200).json(result);
});

cliente.get(
	"/historico-pedidos/:id",
	async (request: Request, response: Response) => {
		const { id } = request.params;
		const result = await clienteController.listarHistorico(id);

		if (!(result instanceof Array)) {
			return response.status(500).json(result);
		}
		return response.status(200).json(result);
	}
);

cliente.post("/", async (request: Request, response: Response) => {
	const { nome, cpf, email, senha } = request.body;

	const result = await clienteController.salvar(nome, cpf, email, senha);

	if (!(result instanceof Cliente)) {
		return response.status(500).json(result);
	}
	return response.status(201).json(result);
});

cliente.put("/", async (request: Request, response: Response) => {
	const { id, nome, cpf, email } = request.body;

	const result = await clienteController.atualizar(id, nome, cpf, email);

	if (!(result instanceof Cliente)) {
		return response.status(500).json(result);
	}
	return response.status(201).json(result);
});

cliente.delete("/:id", async (request: Request, response: Response) => {
	const { id } = request.params;
	const result = await clienteController.deletar(id);

	if (result !== true) {
		return response.status(500).json(result);
	}
	return response.status(200).json(result);
});

export { cliente };
