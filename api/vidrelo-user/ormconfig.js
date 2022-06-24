module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [`${process.env.ORM_PATH}/modules/**/entities/*{.ts,.js}`],
  migrations: [`${process.env.ORM_PATH}/shared/infra/database/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: `${process.env.ORM_PATH}/shared/infra/database/migrations`,
  },
  synchronize: false,
}
