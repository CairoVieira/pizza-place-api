import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnIsMenuPizza1621111811012 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			"pizzas",
			new TableColumn({
				name: "is_menu",
				type: "boolean",
				default: "false",
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
