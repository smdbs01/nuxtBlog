import { drizzle } from "drizzle-orm/mysql2"
import * as schema from "./schema"
import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

export const db = drizzle(connection, { schema, mode: "default"})