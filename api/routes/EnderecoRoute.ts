import { Request, Response, Router } from "express";
import { EnderecoController } from "../controllers/EnderecoController";
import { Endereco } from "../models/Endereco";

const endereco = Router();
const enderecoController = new EnderecoController();

endereco.get("/", async (request: Request, response: Response) => {
	const result = await enderecoController.listar();

	if (!(result instanceof Array)) {
		return response.status(500).json(result);
	}
	return response.status(200).json(result);
});

endereco.get("/cliente/:id", async (request: Request, response: Response) => {
	const { id } = request.params;
	const result = await enderecoController.listarPorCliente(id);

	if (!(result instanceof Array)) {
		return response.status(500).json(result);
	}
	return response.status(200).json(result);
});

endereco.get("/principal/:id", async (request: Request, response: Response) => {
	const { id } = request.params;
	const result = await enderecoController.salvarPrincipal(id);

	if (!(result instanceof Array)) {
		return response.status(500).json(result);
	}
	return response.status(200).json(result);
});

endereco.get("/:id", async (request: Request, response: Response) => {
	const { id } = request.params;
	const result = await enderecoController.listarUm(id);

	if (!(result instanceof Endereco)) {
		return response.status(500).json(result);
	}
	return response.status(200).json(result);
});

endereco.post("/", async (request: Request, response: Response) => {
	const {
		logradouro,
		numero,
		complemento,
		bairro,
		cep,
		cidade,
		estado,
		pais,
		cliente_id,
		is_principal,
	} = request.body;

	const result = await enderecoController.salvar(
		logradouro,
		numero,
		complemento,
		bairro,
		cep,
		cidade,
		estado,
		pais,
		is_principal,
		cliente_id
	);

	if (!(result instanceof Endereco)) {
		return response.status(500).json(result);
	}
	return response.status(201).json(result);
});

endereco.put("/", async (request: Request, response: Response) => {
	const {
		id,
		logradouro,
		numero,
		complemento,
		bairro,
		cep,
		cidade,
		estado,
		pais,
		cliente_id,
	} = request.body;

	const result = await enderecoController.atualizar(
		id,
		logradouro,
		numero,
		complemento,
		bairro,
		cep,
		cidade,
		estado,
		pais,
		cliente_id
	);

	if (!(result instanceof Endereco)) {
		return response.status(500).json(result);
	}
	return response.status(201).json(result);
});

endereco.delete("/:id", async (request: Request, response: Response) => {
	const { id } = request.params;
	const result = await enderecoController.deletar(id);

	if (result !== true) {
		return response.status(500).json(result);
	}
	return response.status(200).json(result);
});

export { endereco };
