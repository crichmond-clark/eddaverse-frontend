import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  EMAIL_SERVER_USER: z.string(),
  EMAIL_SERVER_PASSWORD: z.string(),
  EMAIL_SERVER_HOST: z.string(),
  EMAIL_SERVER_PORT: z.string(),
  EMAIL_FROM: z.string(),
  NEON_DATABASE_URL: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    `Missing or invalid environment variable${
      parsed.error.errors.length > 1 ? "s" : ""
    }:
${parsed.error.errors
  .map((error) => `  ${error.path}: ${error.message}`)
  .join("\n")}
`
  );
  process.exit(1);
}

export const env = Object.freeze(parsed.data);
