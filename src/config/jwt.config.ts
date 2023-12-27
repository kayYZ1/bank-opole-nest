import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.SECRET,
  access_secret: process.env.ACCESS_SECRET,
  refresh_secret: process.env.REFRESH_SECRET,
}));
