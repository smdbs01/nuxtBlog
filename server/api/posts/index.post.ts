import { db } from "~/server/db"
import { posts } from "~/server/db/schema"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  await db.insert(posts).values(body)
  return "OK"
})