import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";

export * from './schema'

export const db = drizzle(process.env.DATABASE_URL as string);