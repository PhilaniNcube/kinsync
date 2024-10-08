  import { createServerClient, type CookieOptions } from "@supabase/ssr";
		import { cookies } from "next/headers";
		import type { Database } from "../types/schema";

		export function createClient() {
			const cookieStore = cookies();

			return createServerClient<Database>(
				process.env.NEXT_PUBLIC_SUPABASE_URL,
				process.env.SERVICE_KEY,
				{
					cookies: {
						getAll() {
							return cookieStore.getAll();
						},
						setAll(cookiesToSet) {
							try {
								// biome-ignore lint/complexity/noForEach: <explanation>
								cookiesToSet.forEach(({ name, value, options }) =>
									cookieStore.set(name, value, options),
								);
							} catch {
								// The `setAll` method was called from a Server Component.
								// This can be ignored if you have middleware refreshing
								// user sessions.
							}
						},
					},
				},
			);
		}
