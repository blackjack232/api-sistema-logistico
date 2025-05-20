import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('error', (err: Error) => console.error('Redis Error:', err));

export default redisClient;
