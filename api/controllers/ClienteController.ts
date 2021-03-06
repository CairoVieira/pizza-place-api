import btoa from "btoa";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { EnderecoRepository } from "../repositories/EnderecoRepository";
import { ItensPedidoRepository } from "../repositories/ItensPedidoRepository";
import { LoginRepository } from "../repositories/LoginRepository";
import { PedidoRepository } from "../repositories/PedidoRepository";

class ClienteController {
	async listar() {
		try {
			const clienteRepository = getCustomRepository(ClienteRepository);
			const listaClientes = await clienteRepository.find();

			return listaClientes;
		} catch (err) {
			return { error: err.message };
		}
	}

	async listarUm(id: string) {
		try {
			const clienteRepository = getCustomRepository(ClienteRepository);
			const enderecoRepository = getCustomRepository(EnderecoRepository);

			const cliente = await clienteRepository.findOne(id);

			if (!cliente) return { error: "Cliente não existe" };

			const enderecos = await enderecoRepository.findOne({
				where: { cliente_id: cliente.id },
			});
			cliente.endereco = enderecos;

			return cliente;
		} catch (err) {
			return { error: err.message };
		}
	}

	async listaPizzasCliente(id: string) {
		try {
			const pedidoRepository = getCustomRepository(PedidoRepository);

			const sql = `SELECT
								pizzas.id,
								pizzas.nome,
								pizzas.valor,
								pizzas.created_at,
								pizzas.updated_at,
								CASE pizzas.is_menu WHEN 0 then 'false'
									ELSE 'true'
									END as is_menu
							FROM
								pedidos pedidos
							LEFT JOIN itens_pedido itens_pedido ON
								pedidos.id = itens_pedido.pedido_id
							LEFT JOIN pizzas pizzas ON
								itens_pedido.pizza_id = pizzas.id
							WHERE
								pedidos.cliente_id = '${id}'
								AND pizzas.is_menu = 0`;

			const pizzas = await pedidoRepository.query(sql);

			return pizzas;
		} catch (err) {
			return { error: err.message };
		}
	}

	async listarHistorico(id: string) {
		try {
			const pedidoRepository = getCustomRepository(PedidoRepository);
			const itensPedidoRepository = getCustomRepository(
				ItensPedidoRepository
			);
			const listaPedidos = await pedidoRepository.find({
				where: { cliente_id: id },
				relations: ["cliente", "endereco"],
			});

			const listaItensPedidos = await itensPedidoRepository.find({
				relations: ["pizza", "bebida", "favorito"],
			});

			listaPedidos.forEach((pedido) => {
				let itens = listaItensPedidos.filter(
					(item) => item.pedido_id == pedido.id
				);
				pedido.itens_pedido = itens;
			});

			return listaPedidos;
		} catch (err) {
			return { error: err.message };
		}
	}

	async salvar(nome: string, cpf: string, email: string, senha: string) {
		try {
			const cliente = yup.object().shape({
				nome: yup.string().required("Nome é obrigatório"),
				cpf: yup.string().required("CPF é obrigatório"),
				email: yup
					.string()
					.email()
					.uppercase()
					.required("Email é obrigatório"),
				senha: yup.string().required("Senha é obrigatório"),
			});

			await cliente.validate({ nome, cpf, email, senha });

			const clienteRepository = getCustomRepository(ClienteRepository);
			const loginRepository = getCustomRepository(LoginRepository);

			const existeEmail = await loginRepository.findOne({
				where: { email: email.toLowerCase() },
			});

			if (existeEmail) {
				return { error: "E-mail já existe" };
			}

			const clienteCreated = clienteRepository.create({
				nome: nome.toLowerCase(),
				cpf,
			});
			await clienteRepository.save(clienteCreated);

			const senhaCripto = btoa("Zap_" + senha + "_ata");

			const loginCreated = loginRepository.create({
				email: email.toLowerCase(),
				senha: senhaCripto,
				cliente_id: clienteCreated.id,
			});
			await loginRepository.save(loginCreated);

			return clienteCreated;
		} catch (err) {
			return { error: err.message };
		}
	}

	async atualizar(id: string, nome: string, cpf: string, email: string) {
		try {
			const cliente = yup.object().shape({
				nome: yup.string().required("Nome é obrigatório"),
				cpf: yup.string().required("CPF é obrigatório"),
				email: yup.string().uppercase().required("Email é obrigatório"),
			});

			await cliente.validate({ nome, cpf, email });

			const clienteRepository = getCustomRepository(ClienteRepository);
			const loginRepository = getCustomRepository(LoginRepository);

			const clienteUpdated = await loginRepository.findOne({
				where: { cliente_id: id },
			});

			if (!clienteUpdated) {
				return { error: "Cliente não existe" };
			}
			const clienteCreated = clienteRepository.create({
				id,
				nome: nome.toLowerCase(),
				cpf,
				updated_at: new Date(),
			});

			loginRepository.create({
				email: email.toLowerCase(),
				senha: clienteUpdated.senha,
				cliente_id: clienteCreated.id,
			});

			await clienteRepository.save(clienteCreated);

			return clienteCreated;
		} catch (err) {
			return { error: err.message };
		}
	}

	async deletar(id: string) {
		try {
			const clienteRepository = getCustomRepository(ClienteRepository);

			const clienteExiste = await clienteRepository.findOne(id);
			if (!clienteExiste) return { error: "Cliente não existe" };

			await clienteRepository.delete({ id: id });
			const cliente = await clienteRepository.findOne(id);

			if (!cliente) return true;
			return { error: "Não foi possível deletar" };
		} catch (err) {
			return { error: err.message };
		}
	}
}

export { ClienteController };
