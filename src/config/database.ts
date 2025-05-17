// src/config/database.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render te dará esta URL
  ssl: {
    rejectUnauthorized: false, // Necesario para conexiones SSL con Render
  },
});

export default pool;
