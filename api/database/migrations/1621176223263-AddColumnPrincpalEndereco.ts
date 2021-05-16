import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnPrincpalEndereco1621176223263
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			"enderecos",
			new TableColumn({
				name: "is_principal",
				type: "boolean",
				default: "false",
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
