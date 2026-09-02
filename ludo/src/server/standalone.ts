import { LudoServer } from './ws-server';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const server = new LudoServer(PORT);

process.on('SIGINT', () => {
  console.log('Shutting down Ludo server...');
  server.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down Ludo server...');
  server.close();
  process.exit(0);
});
