import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { ItensPedido } from "../models/ItensPedido";
import { FavoritoRepository } from "../repositories/FavoritoRepository";
import { ItensPedidoRepository } from "../repositories/ItensPedidoRepository";
import { PedidoRepository } from "../repositories/PedidoRepository";

class PedidoController {
    async listar() {
        try {
            const pedidoRepository = getCustomRepository(PedidoRepository);
            const itensPedidoRepository = getCustomRepository(
                ItensPedidoRepository
            );

            const listaPedidos = await pedidoRepository.find({
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

    async listarUm(id: string) {
        try {
            const pedidoRepository = getCustomRepository(PedidoRepository);
            const pedido = await pedidoRepository.findOne(id);
            const itensPedidoRepository = getCustomRepository(
                ItensPedidoRepository
            );
            const favoritoRepository = getCustomRepository(FavoritoRepository);

            if (!pedido) return { error: "Pedido não existe" };

            const listaItensPedido = await itensPedidoRepository.find({
                where: { pedido_id: id },
                relations: ["pizza", "bebida", "favorito"],
            });

            const listaFavoritos = await favoritoRepository.find({
                where: { cliente_id: pedido.cliente_id },
                relations: ["pizza", "bebida", "cliente"],
            });

            let favoritos = [];
            listaItensPedido.forEach((item) => {
                favoritos = listaFavoritos.filter(
                    (fav) => fav.id === item.favorito_id
                );
            });

            listaItensPedido.forEach((item) => {
                favoritos.forEach((f) => (item.favorito = f));
            });

            pedido.itens_pedido = listaItensPedido;

            return pedido;
        } catch (err) {
            return { error: err.message };
        }
    }

    async salvar(
        cliente_id: string,
        endereco_id: string,
        valor: number,
        metodo_pagamento: string,
        itens_pedido: ItensPedido[]
    ) {
        try {
            const pedido = yup.object().shape({
                cliente_id: yup.string().required("ID Cliente é obrigatório"),
                endereco_id: yup.string().required("ID Endereço é obrigatório"),
                metodo_pagamento: yup
                    .string()
                    .required("Método de Pagamento é obrigatório"),
                valor: yup.number().required("Valor é obrigatório"),
                itens_pedido: yup
                    .array()
                    .required("Itens de Pedido é obrigatório")
                    .min(1),
            });

            await pedido.validate({
                cliente_id,
                endereco_id,
                valor,
                metodo_pagamento,
                itens_pedido,
            });

            const pedidoRepository = getCustomRepository(PedidoRepository);
            const itensPedidoRepository = getCustomRepository(
                ItensPedidoRepository
            );

            const pedidoCreated = pedidoRepository.create({
                cliente_id,
                endereco_id,
                valor,
                metodo_pagamento,
            });

            itens_pedido.forEach(async (item) => {
                console.log("item=", item);
                const itensPedidoCreated = itensPedidoRepository.create({
                    pedido_id: pedidoCreated.id,
                    bebida_id: item.bebida_id,
                    pizza_id: item.pizza_id,
                    favorito_id: item.favorito_id,
                    valor_item_pedido: item.valor_item_pedido,
                });

                await itensPedidoRepository.save(itensPedidoCreated);
            });

            await pedidoRepository.save(pedidoCreated);

            return pedidoCreated;
        } catch (err) {
            return { error: err.message };
        }
    }

    async atualizar(
        id: string,
        cliente_id: string,
        endereco_id: string,
        valor: number,
        metodo_pagamento: string,
        itens_pedido: ItensPedido[]
    ) {
        try {
            const pedido = yup.object().shape({
                id: yup.string().required("ID é obrigatório"),
                cliente_id: yup.string().required("ID Cliente é obrigatório"),
                endereco_id: yup.string().required("ID Endereço é obrigatório"),
                metodo_pagamento: yup
                    .string()
                    .required("Método de Pagamento é obrigatório"),
                valor: yup.number().required("Valor é obrigatório"),
                itens_pedido: yup
                    .array()
                    .required("Itens de Pedido é obrigatório")
                    .min(1),
            });

            await pedido.validate({
                id,
                cliente_id,
                endereco_id,
                valor,
                metodo_pagamento,
                itens_pedido,
            });

            const pedidoRepository = getCustomRepository(PedidoRepository);
            const itensPedidoRepository = getCustomRepository(
                ItensPedidoRepository
            );
            const pedidoUpdated = await pedidoRepository.findOne(id);

            if (!pedidoUpdated) {
                return { error: "Pedido não existe" };
            }
            const pedidoCreated = pedidoRepository.create({
                id,
                cliente_id,
                endereco_id,
                valor,
                metodo_pagamento,
            });

            const deletou = itensPedidoRepository.delete({
                pedido_id: id,
            });

            if (deletou) {
                itens_pedido.forEach(async (item) => {
                    const itensPedidoCreated = itensPedidoRepository.create({
                        pedido_id: pedidoCreated.id,
                        bebida_id: item.bebida_id,
                        pizza_id: item.pizza_id,
                        favorito_id: item.favorito_id,
                        valor_item_pedido: item.valor_item_pedido,
                    });

                    await itensPedidoRepository.save(itensPedidoCreated);
                });
            }
            await pedidoRepository.save(pedidoCreated);

            return pedidoCreated;
        } catch (err) {
            return { error: err.message };
        }
    }

    async deletar(id: string) {
        try {
            const pedidoRepository = getCustomRepository(PedidoRepository);

            const pedidoExiste = await pedidoRepository.findOne(id);

            if (!pedidoExiste) return { error: "Pedido não existe" };

            await pedidoRepository.delete({ id: id });

            const pedido = await pedidoRepository.findOne(id);

            if (!pedido) return true;

            return { error: "Não foi possível deletar" };
        } catch (err) {
            return { error: err.message };
        }
    }
}

export { PedidoController };
