import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Cliente } from "./Cliente";
import { Endereco } from "./Endereco";
import { ItensPedido } from "./ItensPedido";

@Entity("pedidos")
class Pedido {
    @PrimaryColumn()
    id: string;

    @Column()
    cliente_id: string;

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: "cliente_id" })
    cliente: Cliente;

    @Column()
    endereco_id: string;

    @ManyToOne(() => Endereco)
    @JoinColumn({ name: "endereco_id" })
    endereco: Endereco;

    @Column()
    metodo_pagamento: string;

    @Column()
    valor: number;

    itens_pedido: ItensPedido[];

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

export { Pedido };
