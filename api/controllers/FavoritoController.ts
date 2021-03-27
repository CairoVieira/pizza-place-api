import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { FavoritoRepository } from "../repositories/FavoritoRepository";

class FavoritoController {
    async listar() {
        try {
            const favoritoRepository = getCustomRepository(FavoritoRepository);
            const listaFavoritos = await favoritoRepository.find({
                relations: ["pizza", "bebida", "cliente"],
            });

            return listaFavoritos;
        } catch (err) {
            return { error: err.message };
        }
    }

    async listarUm(id: string) {
        try {
            const favoritoRepository = getCustomRepository(FavoritoRepository);
            const favorito = await favoritoRepository.findOne({
                where: { id },
                relations: ["pizza", "bebida", "cliente"],
            });

            if (!favorito) return { error: "Favorito não existe" };
            return favorito;
        } catch (err) {
            return { error: err.message };
        }
    }

    async salvar(pizza_id: string, bebida_id: string, cliente_id: string) {
        try {
            const favorito = yup.object().shape({
                cliente_id: yup.string().required("ID cliente é obrigatório"),
            });

            await favorito.validate({ pizza_id, bebida_id, cliente_id });

            const favoritoRepository = getCustomRepository(FavoritoRepository);

            const existeFavorito = await favoritoRepository.findOne({
                where: { pizza_id, bebida_id, cliente_id },
            });

            if (existeFavorito) {
                return { error: "Favorito já existe" };
            }

            const favoritoCreated = favoritoRepository.create({
                pizza_id,
                bebida_id,
                cliente_id,
            });

            await favoritoRepository.save(favoritoCreated);

            return favoritoCreated;
        } catch (err) {
            return { error: err.message };
        }
    }

    async atualizar(
        id: string,
        pizza_id: string,
        bebida_id: string,
        cliente_id: string
    ) {
        try {
            const favorito = yup.object().shape({
                id: yup.string().required("ID é obrigatório"),
                cliente_id: yup.string().required("ID cliente é obrigatório"),
            });

            await favorito.validate({ id, pizza_id, bebida_id, cliente_id });

            const favoritoRepository = getCustomRepository(FavoritoRepository);
            const favoritoUpdated = await favoritoRepository.findOne(id);

            if (!favoritoUpdated) {
                return { error: "Favorito não existe" };
            }
            const favoritoCreated = favoritoRepository.create({
                id,
                pizza_id,
                bebida_id,
                cliente_id,
                updated_at: new Date(),
            });

            await favoritoRepository.save(favoritoCreated);

            return favoritoCreated;
        } catch (err) {
            return { error: err.message };
        }
    }

    async deletar(id: string) {
        try {
            const favoritoRepository = getCustomRepository(FavoritoRepository);

            const favoritoExiste = await favoritoRepository.findOne(id);

            if (!favoritoExiste) return { error: "Favorito não existe" };

            await favoritoRepository.delete({ id: id });

            const favorito = await favoritoRepository.findOne(id);

            if (!favorito) return true;

            return { error: "Não foi possível deletar" };
        } catch (err) {
            return { error: err.message };
        }
    }
}

export { FavoritoController };
