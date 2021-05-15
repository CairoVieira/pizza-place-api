import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { ItensPizza } from "./ItensPizza";

@Entity("pizzas")
class Pizza {
	@PrimaryColumn()
	id: string;

	@Column()
	nome: string;

	itens_pizza: ItensPizza[];

	@Column()
	valor: number;

	@Column()
	is_menu: boolean;

	@CreateDateColumn()
	created_at: Date;

	@CreateDateColumn()
	updated_at: Date;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { Pizza };
