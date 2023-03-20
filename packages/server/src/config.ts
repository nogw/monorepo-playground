import dotenv from 'dotenv-safe';
import path from 'path';

const root = path.join.bind(process.cwd());

dotenv.config({
  path: root('.env'),
  sample: root('.env.example'),
});

const { PORT, NODE_ENV, MONGO_URI, JWT_SECRET } = process.env;

const DBdevelopment = MONGO_URI || 'mongodb://127.0.0.1:27017/fp';
const DBproduction = MONGO_URI || 'mongodb://127.0.0.1:27017/fp';

export const config = {
  PORT: PORT || 3000,
  NODE_ENV: NODE_ENV,
  MONGO_URI: NODE_ENV === 'production' ? DBproduction : DBdevelopment,
  JWT_SECRET: JWT_SECRET || '',
};
