import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAuthTable1640027983407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '50',
            isPrimary: true,
          },
          {
            name: 'access_token',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'expires_in',
            type: 'varchar',
            length: '25',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            length: '150',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('auth', true);
  }
}
