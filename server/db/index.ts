import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";
import mysql from "mysql2/promise";

const poolConnection = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "db",
});

export const db = drizzle(poolConnection, { schema, mode: "default" });
