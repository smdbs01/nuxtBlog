// @ts-ignore
import bcrypt from "bcrypt";
const saltRound = 10;

export async function hashPassword(password: string) {
  try {
    const hash = await bcrypt.hash(password, saltRound);
    return hash;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Error hashing password",
    });
  }
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Error comparing passwords",
    });
  }
}
