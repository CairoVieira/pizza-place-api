import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { Cliente } from "./Cliente";

@Entity("login")
class Login {
    @PrimaryColumn()
    email: string;

    @Column()
    senha: string;

    @Column()
    cliente_id: string;

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: "cliente_id" })
    cliente: Cliente;
    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}

export { Login };
