# projeto-vidrelo-server

- First, execute the docker container in the root folder: projeto-vidrelo-server/api/database:

```bash
  docker compose up -d
```

- Second, set the enviroment variables inside of a .ENV file, the .ENV file structure is inside of .ENV.EXAMPLES
  DB_TYPE = postgres
  DB_HOST = localhost
  DB_PORT = 5432
  DB_NAME = postgres
  DB_USERNAME = root
  DB_PASSWORD = root
  ORM_PATH = ./src/  

  SERVER_PORT = //porta definida no arquivo server.ts
  SECRET_KEY = '' #JSONWEBTOKEN

- After that just install all dependencies:

```bash
  yarn or yarn install
```

- Creation of the ormconfig.js file using this code:
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

- Now you can run locally your API by typing:
```bash
  yarn start:dev
```

- Finally just run the migrations:

```bash
  yarn typeorm migration:run
```
