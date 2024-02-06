import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";
import mysql from "mysql2/promise";

const config = useRuntimeConfig();

const connection = await mysql.createConnection({
  host: config.MYSQL_HOST,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
});

export const db = drizzle(connection, { schema, mode: "default" });
