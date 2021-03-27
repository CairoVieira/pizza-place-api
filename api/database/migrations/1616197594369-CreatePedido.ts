import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePedido1616197594369 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pedidos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "cliente_id",
                        type: "uuid",
                    },
                    {
                        name: "endereco_id",
                        type: "uuid",
                    },
                    {
                        name: "metodo_pagamento",
                        type: "varchar",
                    },
                    {
                        name: "valor",
                        type: "number",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKCliente",
                        referencedTableName: "clientes",
                        referencedColumnNames: ["id"],
                        columnNames: ["cliente_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKEndereco",
                        referencedTableName: "enderecos",
                        referencedColumnNames: ["id"],
                        columnNames: ["endereco_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pedidos");
    }
}
