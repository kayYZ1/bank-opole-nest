import { registerAs } from '@nestjs/config';

export default registerAs('postgre', () => ({
  name: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  type: process.env.DB_TYPE,
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  port: process.env.PG_PORT
}));
