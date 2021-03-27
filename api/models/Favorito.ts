import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Bebida } from "./Bebida";
import { Cliente } from "./Cliente";
import { Pizza } from "./Pizza";

@Entity("favoritos")
class Favorito {
    @PrimaryColumn()
    id: string;

    @Column()
    pizza_id: string;

    @OneToOne(() => Pizza)
    @JoinColumn({ name: "pizza_id" })
    pizza: Pizza;

    @Column()
    bebida_id: string;

    @OneToOne(() => Bebida)
    @JoinColumn({ name: "bebida_id" })
    bebida: Bebida;

    @Column()
    cliente_id: string;

    @OneToOne(() => Cliente)
    @JoinColumn({ name: "cliente_id" })
    cliente: Cliente;

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

export { Favorito };
