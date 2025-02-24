import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";

export * from './schema'
import * as schema from './schema';

export const db = drizzle(process.env.DATABASE_URL! , {schema  , mode: 'default' , logger: false});