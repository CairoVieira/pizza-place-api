import btoa from "btoa";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { EnderecoRepository } from "../repositories/EnderecoRepository";
import { LoginRepository } from "../repositories/LoginRepository";

class LoginController {
	async atualizar(senha: string, cliente_id: string, email: string) {
		try {
			const login = yup.object().shape({
				senha: yup.string().required("Senha é obrigatório"),
				cliente_id: yup.string().required("ID é obrigatório"),
				email: yup.string().uppercase().required("Email é obrigatório"),
			});

			await login.validate({ senha, cliente_id, email });

			const loginRepository = getCustomRepository(LoginRepository);

			const loginUpdated = await loginRepository.findOne({
				where: { cliente_id: cliente_id },
			});

			if (!loginUpdated) {
				return { error: "Cliente não existe" };
			}

			const senhaCripto = btoa("Zap_" + senha + "_ata");

			const loginCreated = loginRepository.create({
				email: loginUpdated.email.toLowerCase(),
				senha: senhaCripto,
				cliente_id: cliente_id,
				updated_at: new Date(),
			});
			await loginRepository.save(loginCreated);

			return loginCreated;
		} catch (err) {
			return { error: err.message };
		}
	}

	async autenticar(email: string, senha: string) {
		try {
			const loginValidator = yup.object().shape({
				senha: yup.string().required("Senha é obrigatório"),
				email: yup.string().uppercase().required("Email é obrigatório"),
			});

			await loginValidator.validate({ senha, email });

			const loginRepository = getCustomRepository(LoginRepository);
			const clienteRepository = getCustomRepository(ClienteRepository);
			const enderecoRepository = getCustomRepository(EnderecoRepository);

			const login = await loginRepository.findOne({
				where: { email: email, senha: senha },
			});
			if (!login) return { error: "E-mail ou senha inválidos" };

			const cliente = await clienteRepository.findOne(login.cliente_id);

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
}

export { LoginController };
