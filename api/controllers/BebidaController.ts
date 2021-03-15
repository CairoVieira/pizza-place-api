import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { BebidaRepository } from "../repositories/BebidaRepository";

class BebidaController {
    async listar() {
        try {
            const bebidaRepository = getCustomRepository(BebidaRepository);
            const listaBebidas = await bebidaRepository.find();

            return listaBebidas;
        } catch (err) {
            return { error: err.message };
        }
    }

    async listarUm(id: string) {
        try {
            const bebidaRepository = getCustomRepository(BebidaRepository);
            const bebida = await bebidaRepository.findOne(id);

            if (!bebida) return { error: "Bebida não existe" };
            return bebida;
        } catch (err) {
            return { error: err.message };
        }
    }

    async salvar(nome: string, valor: number, categoria: string) {
        try {
            const bebida = yup.object().shape({
                nome: yup.string().required("Nome é obrigatório"),
                valor: yup.number().required("Valor é obrigatório"),
                categoria: yup
                    .string()
                    .uppercase()
                    .required("Tipo é obrigatório"),
            });

            await bebida.validate({ nome, valor, categoria });

            const bebidaRepository = getCustomRepository(BebidaRepository);

            const existeBebida = await bebidaRepository.findOne({
                where: { nome: nome.toLowerCase() },
            });

            if (existeBebida) {
                return { error: "Bebida já existe" };
            }

            const bebidaCreated = bebidaRepository.create({
                nome: nome.toLowerCase(),
                valor,
                categoria: categoria.toUpperCase(),
            });

            await bebidaRepository.save(bebidaCreated);

            return bebidaCreated;
        } catch (err) {
            return { error: err.message };
        }
    }

    async atualizar(
        id: string,
        nome: string,
        valor: number,
        categoria: string
    ) {
        try {
            const bebida = yup.object().shape({
                id: yup.string().required("ID é obrigatório"),
                nome: yup.string().required("Nome é obrigatório"),
                valor: yup.number().required("Valor é obrigatório"),
                categoria: yup
                    .string()
                    .uppercase()
                    .required("Tipo é obrigatório"),
            });

            await bebida.validate({ id, nome, valor, categoria });

            const bebidaRepository = getCustomRepository(BebidaRepository);
            const bebidaUpdated = await bebidaRepository.findOne(id);

            if (!bebidaUpdated) {
                return { error: "Bebida não existe" };
            }
            const bebidaCreated = bebidaRepository.create({
                id,
                nome: nome.toLowerCase(),
                valor,
                categoria: categoria.toUpperCase(),
                updated_at: new Date(),
            });

            await bebidaRepository.save(bebidaCreated);

            return bebidaCreated;
        } catch (err) {
            return { error: err.message };
        }
    }
}

export { BebidaController };
