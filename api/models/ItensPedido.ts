import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Bebida } from "./Bebida";
import { Favorito } from "./Favorito";
import { Pizza } from "./Pizza";

@Entity("itens_pedido")
class ItensPedido {
	@PrimaryColumn()
	id: string;

	@Column()
	pizza_id: string;

	@ManyToOne(() => Pizza)
	@JoinColumn({ name: "pizza_id" })
	pizza: Pizza;

	@Column()
	bebida_id: string;

	@ManyToOne(() => Bebida)
	@JoinColumn({ name: "bebida_id" })
	bebida: Bebida;

	@Column()
	favorito_id: string;

	@ManyToOne(() => Favorito)
	@JoinColumn({ name: "favorito_id" })
	favorito: Favorito;

	@Column()
	pedido_id: string;

	@Column()
	valor_item_pedido: number;

	@Column()
	quantidade: number;

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

export { ItensPedido };
