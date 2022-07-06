# projeto-vidrelo-server

- First, execute the docker container in the root folder: projeto-vidrelo-server/api/database:

```bash
  docker compose up -d
```

- Second, set the enviroment variables inside of a .ENV file, the .ENV file structure is inside of .ENV.EXAMPLES

- After that just install all dependencies:

```bash
  yarn or yarn install
```

- Now you can run locally your API by typing:

```bash
  yarn start:dev
```

- Finally just run the migrations:

```bash
  yarn typeorm migration:run
```
