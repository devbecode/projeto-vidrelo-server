import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class changeAccessory1647372118115 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'accessory',
      'type',
      new TableColumn({
        name: 'type',
        type: 'varchar',
        length: '150',
        isNullable: false,
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
