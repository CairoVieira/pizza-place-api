import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateItensPizza1615777319663 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "itens_pizza",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "pizza_id",
                        type: "uuid",
                    },
                    {
                        name: "ingrediente_id",
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
                        name: "FKIngrediente",
                        referencedTableName: "ingredientes",
                        referencedColumnNames: ["id"],
                        columnNames: ["ingrediente_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("itens_pizza");
    }
}
