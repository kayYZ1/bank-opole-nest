import { registerAs } from '@nestjs/config';

export default registerAs('postgre', () => ({
  name: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
}));
