import { cookies } from "next/headers";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { promises as fs } from "fs";
import path from "path";

/**
 * Demo auth that runs with ZERO external services:
 *  - Users are stored in ./data/users.json (created on first signup).
 *  - Sessions are signed JWTs in an httpOnly cookie.
 * For production, swap the user store for Postgres/Supabase (see README) and
 * set AUTH_SECRET in your environment.
 */

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || "dev-secret-change-me");
const COOKIE = "session";
const USERS_FILE = path.join(process.cwd(), "data", "users.json");

type User = { email: string; hash: string };

async function readUsers(): Promise<User[]> {
  try {
    return JSON.parse(await fs.readFile(USERS_FILE, "utf8"));
  } catch {
    return [];
  }
}
async function writeUsers(users: User[]) {
  await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export function hashPassword(pw: string): string {
  const salt = randomBytes(16).toString("hex");
  const key = scryptSync(pw, salt, 64).toString("hex");
  return `${salt}:${key}`;
}
export function verifyPassword(pw: string, stored: string): boolean {
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;
  const hashed = scryptSync(pw, salt, 64);
  const keyBuf = Buffer.from(key, "hex");
  return keyBuf.length === hashed.length && timingSafeEqual(hashed, keyBuf);
}

export async function createUser(email: string, password: string) {
  const users = await readUsers();
  if (users.find((u) => u.email === email)) throw new Error("Email already registered");
  users.push({ email, hash: hashPassword(password) });
  await writeUsers(users);
}
export async function checkUser(email: string, password: string): Promise<boolean> {
  const user = (await readUsers()).find((u) => u.email === email);
  return !!user && verifyPassword(password, user.hash);
}

export async function startSession(email: string) {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
  (await cookies()).set(COOKIE, token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
}
export async function getSession(): Promise<{ email: string } | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return { email: String(payload.email) };
  } catch {
    return null;
  }
}
export async function endSession() {
  (await cookies()).delete(COOKIE);
}
