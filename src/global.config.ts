import * as dotenv from 'dotenv';

dotenv.config({ path: './.env' });
export const HTTP_PORT = process.env.HTTP_PORT || 3000;
export const DB_URL = process.env.DB_URL || 'postgres://localhost:5432';
export const ENVIRONMENT = process.env.NODE_ENV || 'develop';
export const jwtSecret = process.env.JWT_SECRET ?? '';
