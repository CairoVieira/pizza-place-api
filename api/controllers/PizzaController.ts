import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { ItensPizzaRepository } from "../repositories/ItensPizzaRepository";
import { PizzaRepository } from "../repositories/PizzaRepository";

class PizzaController {
	async listar() {
		try {
			const pizzaRepository = getCustomRepository(PizzaRepository);
			const itensPizzaRepository =
				getCustomRepository(ItensPizzaRepository);
			const listaPizzas = await pizzaRepository.find();

			const listaItensPizza = await itensPizzaRepository.find({
				relations: ["ingrediente"],
			});

			listaPizzas.forEach((pizza) => {
				let itens = listaItensPizza.filter(
					(item) => item.pizza_id == pizza.id
				);
				pizza.itens_pizza = itens;
			});

			return listaPizzas;
		} catch (err) {
			return { error: err.message };
		}
	}

	async listarMenu() {
		try {
			const pizzaRepository = getCustomRepository(PizzaRepository);
			const itensPizzaRepository =
				getCustomRepository(ItensPizzaRepository);
			const listaPizzas = await pizzaRepository.find({
				where: { is_menu: true },
			});

			const listaItensPizza = await itensPizzaRepository.find({
				relations: ["ingrediente"],
			});
			console.log("listaItensPizza=", listaItensPizza);

			listaPizzas.forEach((pizza) => {
				let itens = listaItensPizza.filter(
					(item) => item.pizza_id == pizza.id
				);
				pizza.itens_pizza = itens;
				console.log("pizza", pizza);
			});

			return listaPizzas;
		} catch (err) {
			return { error: err.message };
		}
	}

	async listarUm(id: string) {
		try {
			const pizzaRepository = getCustomRepository(PizzaRepository);
			const itensPizzaRepository =
				getCustomRepository(ItensPizzaRepository);
			const pizza = await pizzaRepository.findOne({
				id: id,
			});

			const listaItensPizza = await itensPizzaRepository.find({
				where: { pizza_id: id },
				relations: ["ingrediente"],
			});

			pizza.itens_pizza = listaItensPizza;

			return pizza;
		} catch (err) {
			return { error: err.message };
		}
	}

	async salvar(
		nome: string,
		valor: number,
		itens_pizza: string[],
		is_menu: boolean
	) {
		try {
			const pizza = yup.object().shape({
				nome: yup.string().required("Nome é obrigatório"),
				is_menu: yup.boolean().required("Is_menu é obrigatório"),
				itens_pizza: yup
					.array()
					.required("Itens da pizza é obrigatório")
					.min(1),
			});

			await pizza.validate({ nome, valor, itens_pizza, is_menu });

			const pizzaRepository = getCustomRepository(PizzaRepository);
			const itensPizzaRepository =
				getCustomRepository(ItensPizzaRepository);

			const existePizza = await pizzaRepository.findOne({
				where: { nome: nome.toLowerCase(), is_menu: true },
			});

			if (existePizza) return { error: "Pizza já existe" };

			const pizzaCreated = pizzaRepository.create({
				nome: nome.toLowerCase(),
				valor: valor ? valor : 0,
				is_menu: is_menu,
			});

			await pizzaRepository.save(pizzaCreated);

			itens_pizza.forEach(async (item) => {
				const itensPizzaCreated = itensPizzaRepository.create({
					pizza_id: pizzaCreated.id,
					ingrediente_id: item,
				});

				await itensPizzaRepository.save(itensPizzaCreated);
			});

			return pizzaCreated;
		} catch (err) {
			return { error: err.message };
		}
	}

	async atualizar(
		id: string,
		nome: string,
		valor: number,
		itens_pizza: string[]
	) {
		try {
			const pizza = yup.object().shape({
				id: yup.string().required("ID é obrigatório"),
				nome: yup.string().required("Nome é obrigatório"),
				valor: yup.number().required("Valor é obrigatório"),
				itens_pizza: yup
					.array()
					.required("Itens da pizza é obrigatório")
					.min(1),
			});

			await pizza.validate({ id, nome, valor, itens_pizza });

			const pizzaRepository = getCustomRepository(PizzaRepository);
			const itensPizzaRepository =
				getCustomRepository(ItensPizzaRepository);
			const pizzaUpdated = await pizzaRepository.findOne(id);

			if (!pizzaUpdated) {
				return { error: "Pizza não existe" };
			}
			const pizzaCreated = pizzaRepository.create({
				id,
				nome: nome.toLowerCase(),
				valor,
				updated_at: new Date(),
			});

			await pizzaRepository.save(pizzaCreated);

			const deletou = itensPizzaRepository.delete({
				pizza_id: id,
			});

			if (deletou) {
				itens_pizza.forEach(async (item) => {
					const itensPizzaCreated = itensPizzaRepository.create({
						pizza_id: pizzaCreated.id,
						ingrediente_id: item,
					});

					await itensPizzaRepository.save(itensPizzaCreated);
				});
			}

			return pizzaCreated;
		} catch (err) {
			return { error: err.message };
		}
	}

	async deletar(id: string) {
		try {
			const pizzaRepository = getCustomRepository(PizzaRepository);

			const pizzaExiste = await pizzaRepository.findOne(id);

			if (!pizzaExiste) return { error: "Pizza não existe" };

			await pizzaRepository.delete({ id: id });

			const pizza = await pizzaRepository.findOne(id);

			if (!pizza) return true;

			return { error: "Não foi possível deletar" };
		} catch (err) {
			return { error: err.message };
		}
	}
}

export { PizzaController };
