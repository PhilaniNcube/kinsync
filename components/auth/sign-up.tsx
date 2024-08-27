"use client";

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { signUpSchema } from "@/utils/types/validation";
import { signUpAction } from "@/utils/server-actions/auth/sign-up-action";
import { useFormState } from "react-dom";
import SubmitButton from "../submit-button";
import Link from "next/link";

export default function SignUpForm() {
	const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const [state, formAction] = useFormState(signUpAction, null)




	return (
		<div className="flex items-center justify-center min-h-screen bg-muted">
			<Card className="w-full max-w-md px-8 py-6 mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">Create an Account</CardTitle>
					<CardDescription>Enter your details to get started.</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						{state?.status === 200 ? (
							<p
								aria-live="polite"
								className="text-sm font-medium text-green-700"
							>
								Please check your email address for a confirmation email
							</p>
						) : null}
						{state?.status === 403 ? (
							<p
								aria-live="polite"
								className="text-sm font-medium text-red-700"
							>
								{state.message}
							</p>
						) : null}
						<form action={formAction}>
							<div className="space-y-4">
								<div className="grid gap-2">
									<FormField
										control={form.control}
										name="first_name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>First Name</FormLabel>
												<FormControl>
													<Input placeholder="John" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-2">
									<FormField
										control={form.control}
										name="last_name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Last Name</FormLabel>
												<FormControl>
													<Input placeholder="Doe" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
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
											</FormItem>
										)}
									/>
								</div>
								<SubmitButton className="w-full">Sign Up</SubmitButton>
							</div>
						</form>
					</Form>
					<p className="mt-2 text-xs font-medium text-slate-600">
						Already have an account?{" "}
						<Link className="underline" href="/sign-in">
							Sign In
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
