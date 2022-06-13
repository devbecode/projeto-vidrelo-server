import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addIntallationFieldAtProductTable1649694630107
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product',
      new TableColumn({
        name: 'installation',
        type: 'decimal',
        isNullable: true,
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('product', 'installation');
  }
}
