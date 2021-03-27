import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateItensPedido1616197609722 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "itens_pedido",
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
                        name: "favorito_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "pedido_id",
                        type: "uuid",
                    },
                    {
                        name: "valor_item_pedido",
                        type: "number",
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
                        name: "FKFavorito",
                        referencedTableName: "favoritos",
                        referencedColumnNames: ["id"],
                        columnNames: ["favorito_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKPedido",
                        referencedTableName: "pedidos",
                        referencedColumnNames: ["id"],
                        columnNames: ["pedido_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("itens_pedido");
    }
}
