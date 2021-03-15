import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("bebidas")
class Bebida {
    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    @Column()
    valor: number;

    @Column()
    categoria: string;

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

export { Bebida };
