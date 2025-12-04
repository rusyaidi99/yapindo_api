import 'dotenv/config';
import { createClient } from 'redis';

const redis = createClient({
  url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redis.on('error', (err) => console.error('Redis Error:', err));

await redis.connect();

export default redis;