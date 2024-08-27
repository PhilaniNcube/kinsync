import {z} from 'zod';

export const envSchema = z.object({
	PORT: z.string().default("3000"),
	NEXT_PUBLIC_SUPABASE_URL: z.string(),
	NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
	SERVICE_KEY: z.string(),
	SITE_URL: z.string(),
});

envSchema.safeParse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
