/* eslint-disable no-console */
import { createServer } from 'http';

import { connectDatabase } from './database/database';
import { config } from './config';

import app from './app';

(async () => {
  try {
    connectDatabase();
  } catch (error) {
    console.log(`failed to start: ${error}`);
    process.exit(1);
  }

  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    console.log(`server running on port ${config.PORT}`);
  });
})();
