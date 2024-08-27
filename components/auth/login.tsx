"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { signInSchema } from "@/utils/types/validation";
import { useFormState } from "react-dom";
import { signInAction } from "@/utils/server-actions/auth/sign-in-action";
import SubmitButton from "../submit-button";
import Link from "next/link";

type FormValues = {
	email: string;
	password: string;
};

export default function Login() {

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		mode: "onBlur", // This enables validation on blur
	});

  const [state, formAction] = useFormState(signInAction, null)


	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>
					Enter your credentials to access your account.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{state?.status === 403 && <p className="text-sm font-medium text-red-600">{state.message}</p>}
				<Form {...form}>
					<form action={formAction}>
						<div className="grid items-center w-full gap-4">
							<div className="grid gap-2">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input type="email" {...field} />
											</FormControl>
											<FormMessage />
											{state?.error?.email && (
												<FormDescription className="text-red-500">
													{state.error.email}
												</FormDescription>
											)}
										</FormItem>
									)}
								/>
							</div>
							<div className="grid gap-2">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input type="password" {...field} />
											</FormControl>
											<FormMessage />
											{state?.error?.password && (
												<FormDescription className="text-red-500">
													{state.error.password}
												</FormDescription>
											)}
										</FormItem>
									)}
								/>
							</div>
						</div>
						<CardFooter className="px-0 pt-4">
							<SubmitButton className="w-full">Log in</SubmitButton>
						</CardFooter>
					</form>
				</Form>
				<p className="text-xs font-medium text-slate-600">
					Don&apos;t have an account?{" "}
					<Link className="underline" href="/sign-up">
						Create An Account
					</Link>
				</p>
			</CardContent>
		</Card>
	);
}
