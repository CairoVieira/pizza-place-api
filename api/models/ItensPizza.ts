import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Ingrediente } from "./Ingrediente";

@Entity("itens_pizza")
class ItensPizza {
    @PrimaryColumn()
    id: string;

    @Column()
    pizza_id: string;

    // @ManyToOne(() => Pizza)
    // @JoinColumn({ name: "pizza_id" })
    // pizza: Pizza;

    @Column()
    ingrediente_id: string;

    @ManyToOne(() => Ingrediente)
    @JoinColumn({ name: "ingrediente_id" })
    ingrediente: Ingrediente;

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

export { ItensPizza };
