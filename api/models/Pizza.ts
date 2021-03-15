import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { ItensPizza } from "./ItensPizza";

@Entity("pizzas")
class Pizza {
    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    // @OneToMany(() => ItensPizza, (itens_pizza) => itens_pizza.id)
    itens_pizza: ItensPizza[];

    @Column()
    valor: number;

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
