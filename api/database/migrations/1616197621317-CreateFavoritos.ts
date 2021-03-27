import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFavoritos1616197621317 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "favoritos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "pizza_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "bebida_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "cliente_id",
                        type: "uuid",
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
                        name: "FKPizza",
                        referencedTableName: "pizzas",
                        referencedColumnNames: ["id"],
                        columnNames: ["pizza_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKBebida",
                        referencedTableName: "bebidas",
                        referencedColumnNames: ["id"],
                        columnNames: ["bebida_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKCliente",
                        referencedTableName: "clientes",
                        referencedColumnNames: ["id"],
                        columnNames: ["cliente_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("favoritos");
    }
}
