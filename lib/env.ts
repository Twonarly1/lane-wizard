/**
 * Environment variables.
 * Exporting destructured `process.env` does not work in Next.js without hacking:
 * @see https://nextjs.org/docs/api-reference/next.config.js/environment-variables
 * @see https://github.com/vercel/next.js/issues/15574
 */

// core
export const NODE_ENV = process.env.NODE_ENV
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!
