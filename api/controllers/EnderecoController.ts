import btoa from "btoa";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { EnderecoRepository } from "../repositories/EnderecoRepository";

class EnderecoController {
	async listar() {
		try {
			const enderecoRepository = getCustomRepository(EnderecoRepository);
			const listaEnderecos = await enderecoRepository.find();

			return listaEnderecos;
		} catch (err) {
			return { error: err.message };
		}
	}

	async listarPorCliente(id: string) {
		try {
			const enderecoRepository = getCustomRepository(EnderecoRepository);
			const listaEnderecos = await enderecoRepository.find({
				where: { cliente_id: id },
			});

			return listaEnderecos;
		} catch (err) {
			return { error: err.message };
		}
	}

	async listarUm(id: string) {
		try {
			const enderecoRepository = getCustomRepository(EnderecoRepository);
			const endereco = await enderecoRepository.findOne(id);

			if (!endereco) return { error: "Endereco não existe" };
			return endereco;
		} catch (err) {
			return { error: err.message };
		}
	}

	async salvarPrincipal(id: string) {
		try {
			const enderecoRepository = getCustomRepository(EnderecoRepository);
			const endereco = await enderecoRepository.findOne(id);

			enderecoRepository.update(
				{ cliente_id: endereco.cliente_id },
				{
					is_principal: false,
				}
			);

			enderecoRepository.update(
				{ id: endereco.id },
				{
					is_principal: true,
				}
			);

			const listaEnderecos = await enderecoRepository.find({
				where: { cliente_id: endereco.cliente_id },
			});

			return listaEnderecos;
		} catch (err) {
			return { error: err.message };
		}
	}

	async salvar(
		logradouro: string,
		numero: string,
		complemento: string,
		bairro: string,
		cep: string,
		cidade: string,
		estado: string,
		pais: string,
		is_principal: boolean,
		cliente_id: string
	) {
		try {
			const endereco = yup.object().shape({
				logradouro: yup.string().required("Logradouro é obrigatório"),
				numero: yup.string().required("Numero é obrigatório"),
				bairro: yup.string().required("Bairro é obrigatório"),
				cep: yup.string().required("CEP é obrigatório"),
				cidade: yup.string().required("Cidade é obrigatório"),
				estado: yup.string().required("Estado é obrigatório"),
				pais: yup.string().required("País é obrigatório"),
				is_principal: yup
					.boolean()
					.required("IS_PRINCIPAL é obrigatório"),
				cliente_id: yup.string().required("ID Cliente é obrigatório"),
			});

			await endereco.validate({
				logradouro,
				numero,
				complemento,
				bairro,
				cep,
				cidade,
				estado,
				pais,
				is_principal,
				cliente_id,
			});

			const enderecoRepository = getCustomRepository(EnderecoRepository);

			const enderecoCreated = enderecoRepository.create({
				logradouro: logradouro.toLocaleLowerCase(),
				numero: numero.toLocaleLowerCase(),
				complemento: complemento ? complemento.toLocaleLowerCase() : "",
				bairro: bairro.toLocaleLowerCase(),
				cep: cep.toLocaleLowerCase(),
				cidade: cidade.toLocaleLowerCase(),
				estado: estado.toLocaleLowerCase(),
				pais: pais.toLocaleLowerCase(),
				is_principal,
				cliente_id,
			});
			await enderecoRepository.save(enderecoCreated);

			return enderecoCreated;
		} catch (err) {
			return { error: err.message };
		}
	}

	async atualizar(
		id: string,
		logradouro: string,
		numero: string,
		complemento: string,
		bairro: string,
		cep: string,
		cidade: string,
		estado: string,
		pais: string,
		cliente_id: string
	) {
		try {
			const endereco = yup.object().shape({
				logradouro: yup.string().required("Logradouro é obrigatório"),
				numero: yup.string().required("Numero é obrigatório"),
				bairro: yup.string().required("Bairro é obrigatório"),
				cep: yup.string().required("CEP é obrigatório"),
				cidade: yup.string().required("Cidade é obrigatório"),
				estado: yup.string().required("Estado é obrigatório"),
				pais: yup.string().required("País é obrigatório"),
				cliente_id: yup.string().required("ID Cliente é obrigatório"),
			});

			await endereco.validate({
				logradouro,
				numero,
				complemento,
				bairro,
				cep,
				cidade,
				estado,
				pais,
				cliente_id,
			});

			const enderecoRepository = getCustomRepository(EnderecoRepository);
			const enderecoUpdated = await enderecoRepository.findOne({ id });

			if (!enderecoUpdated) {
				return { error: "Endereco não existe" };
			}
			const enderecoCreated = enderecoRepository.create({
				id,
				logradouro: logradouro.toLocaleLowerCase(),
				numero: numero.toLocaleLowerCase(),
				complemento: complemento ? complemento.toLocaleLowerCase() : "",
				bairro: bairro.toLocaleLowerCase(),
				cep: cep.toLocaleLowerCase(),
				cidade: cidade.toLocaleLowerCase(),
				estado: estado.toLocaleLowerCase(),
				pais: pais.toLocaleLowerCase(),
				cliente_id,
				updated_at: new Date(),
			});

			await enderecoRepository.save(enderecoCreated);

			return enderecoCreated;
		} catch (err) {
			return { error: err.message };
		}
	}

	async deletar(id: string) {
		try {
			const enderecoRepository = getCustomRepository(EnderecoRepository);

			const enderecoExiste = await enderecoRepository.findOne(id);
			if (!enderecoExiste) return { error: "Endereco não existe" };

			await enderecoRepository.delete({ id: id });
			const endereco = await enderecoRepository.findOne(id);

			if (!endereco) return true;
			return { error: "Não foi possível deletar" };
		} catch (err) {
			return { error: err.message };
		}
	}
}

export { EnderecoController };
