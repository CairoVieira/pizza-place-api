import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { IngredienteRepository } from "../repositories/IngredienteRepository";

class IngredienteController {
    async listar() {
        try {
            const ingredienteRepository = getCustomRepository(
                IngredienteRepository
            );
            const listaIngredientes = await ingredienteRepository.find();

            return listaIngredientes;
        } catch (err) {
            return { error: err.message };
        }
    }

    async listarUm(id: string) {
        try {
            const ingredienteRepository = getCustomRepository(
                IngredienteRepository
            );
            const ingrediente = await ingredienteRepository.findOne(id);

            if (!ingrediente) return { error: "Ingrediente não existe" };
            return ingrediente;
        } catch (err) {
            return { error: err.message };
        }
    }

    async salvar(nome: string, valor: number, categoria: string) {
        try {
            const ingrediente = yup.object().shape({
                nome: yup.string().required("Nome é obrigatório"),
                valor: yup.number().required("Valor é obrigatório"),
                categoria: yup
                    .string()
                    .uppercase()
                    .required("Categoria é obrigatório"),
            });

            await ingrediente.validate({ nome, valor, categoria });

            const ingredienteRepository = getCustomRepository(
                IngredienteRepository
            );

            const existeIngrediente = await ingredienteRepository.findOne({
                where: { nome: nome.toLowerCase() },
            });

            if (existeIngrediente) {
                return { error: "Ingrediente já existe" };
            }

            const ingredienteCreated = ingredienteRepository.create({
                nome: nome.toLowerCase(),
                valor,
                categoria: categoria.toUpperCase(),
            });

            await ingredienteRepository.save(ingredienteCreated);

            return ingredienteCreated;
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
                    .required("Categoria é obrigatório"),
            });

            await bebida.validate({ id, nome, valor, categoria });

            const ingredienteRepository = getCustomRepository(
                IngredienteRepository
            );
            const ingredienteUpdated = await ingredienteRepository.findOne(id);

            if (!ingredienteUpdated) {
                return { error: "Bebida não existe" };
            }
            const ingredienteCreated = ingredienteRepository.create({
                id,
                nome: nome.toLowerCase(),
                valor,
                categoria: categoria.toUpperCase(),
                updated_at: new Date(),
            });

            await ingredienteRepository.save(ingredienteCreated);

            return ingredienteCreated;
        } catch (err) {
            return { error: err.message };
        }
    }

    async deletar(id: string) {
        try {
            const ingredienteRepository = getCustomRepository(
                IngredienteRepository
            );

            const ingredienteExiste = await ingredienteRepository.findOne(id);

            if (!ingredienteExiste) return { error: "Ingrediente não existe" };

            await ingredienteRepository.delete({ id: id });

            const ingrediente = await ingredienteRepository.findOne(id);

            if (!ingrediente) return true;

            return { error: "Não foi possível deletar" };
        } catch (err) {
            return { error: err.message };
        }
    }
}

export { IngredienteController };
