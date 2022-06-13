import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class changeComposition1648059163989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'composition',
      new TableColumn({
        name: 'hash',
        type: 'varchar',
        length: '200',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('composition', 'hash');
  }
}
