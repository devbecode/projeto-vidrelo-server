import { app } from './app';

const serverPort = process.env.SERVER_PORT || 3004;

app.listen(serverPort, () => {
  console.log(`Server is running at the port ${serverPort}`);
});
