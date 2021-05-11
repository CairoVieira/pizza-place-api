import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Endereco } from "./Endereco";

@Entity("clientes")
class Cliente {
	@PrimaryColumn()
	id: string;

	@Column()
	nome: string;

	@Column()
	cpf: string;

	endereco: Endereco;

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

export { Cliente };
