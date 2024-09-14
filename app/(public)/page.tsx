
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function Component() {
	return (
		<div className="flex flex-col min-h-dvh">

			<main className="flex-1">
				<section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
					<div className="px-4 space-y-10 md:px-6 xl:space-y-16">
						<div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
							<div>
								<h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
									Kinsync - Collaborate with your family or group
								</h1>
								<p className="mx-auto max-w-[700px] mt-3 text-muted-foreground md:text-xl">
									Manage projects, share resources, and communicate effectively
									with your loved ones.
								</p>
								<div className="mt-6 mb-8 space-x-4">
									<Link
										href="/sign-up"
										className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-md shadow h-9 bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
										prefetch={false}
									>
										Sign Up
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 space-y-12 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<div className="inline-block px-3 py-1 text-sm rounded-lg bg-muted">
									Key Features
								</div>
								<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
									Streamline your family or group projects
								</h2>
								<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									Kinsync provides the tools you need to collaborate effectively
									on any project, from home renovations to farming activities.
								</p>
							</div>
						</div>
						<div className="grid items-start gap-8 mx-auto sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
							<div className="grid gap-1">
								<h3 className="text-lg font-bold">Task Management</h3>
								<p className="text-sm text-muted-foreground">
									Assign tasks, set deadlines, and track progress to ensure
									everyone is on the same page.
								</p>
							</div>
							<div className="grid gap-1">
								<h3 className="text-lg font-bold">Resource Sharing</h3>
								<p className="text-sm text-muted-foreground">
									Upload and share documents, photos, and other resources with
									your team.
								</p>
							</div>
							<div className="grid gap-1">
								<h3 className="text-lg font-bold">Communication Tools</h3>
								<p className="text-sm text-muted-foreground">
									Stay connected with built-in chat, video conferencing, and
									notifications.
								</p>
							</div>
							<div className="grid gap-1">
								<h3 className="text-lg font-bold">Calendar Sync</h3>
								<p className="text-sm text-muted-foreground">
									Easily keep track of deadlines, meetings, and important dates
									with calendar integration.
								</p>
							</div>
							<div className="grid gap-1">
								<h3 className="text-lg font-bold">Mobile Access</h3>
								<p className="text-sm text-muted-foreground">
									Stay connected on the go with our mobile app for iOS and
									Android.
								</p>
							</div>
							<div className="grid gap-1">
								<h3 className="text-lg font-bold">Secure and Private</h3>
								<p className="text-sm text-muted-foreground">
									Your data is protected with end-to-end encryption and granular
									access controls.
								</p>
							</div>
						</div>
						<div className="flex flex-col items-start justify-center gap-4 sm:flex-row">
							<Link
								href="/sign-up"
								className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors rounded-md shadow bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
								prefetch={false}
							>
								Sign Up
							</Link>
							<Link
								href="#"
								className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors border rounded-md shadow-sm border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
								prefetch={false}
							>
								Learn More
							</Link>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
					<div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
						<div className="space-y-3">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
								Bring your family or group together with Kinsync
							</h2>
							<p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Streamline your collaborative projects and stay connected with
								your loved ones.
							</p>
						</div>
						<div className="w-full max-w-sm mx-auto space-y-2">
							<form className="flex gap-2">
								<Input
									type="email"
									placeholder="Enter your email"
									className="flex-1 max-w-lg"
								/>
								<Button type="submit">Sign Up</Button>
							</form>
							<p className="text-xs text-muted-foreground">
								Sign up to get started. No credit card required.{" "}
								<Link
									href="#"
									className="underline underline-offset-2"
									prefetch={false}
								>
									Terms &amp; Conditions
								</Link>
							</p>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<div className="inline-block px-3 py-1 text-sm rounded-lg bg-muted">
									Trusted by Families
								</div>
								<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
									Families love using Kinsync
								</h2>
								<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									Hear from some of the families who have used Kinsync to
									streamline their collaborative projects.
								</p>
							</div>
						</div>
						<div className="grid items-center max-w-5xl gap-6 py-12 mx-auto lg:grid-cols-2 lg:gap-12">
							<Image
								src="/placeholder.svg"
								width="550"
								height="310"
								alt="Family using Kinsync"
								className="object-cover object-center mx-auto overflow-hidden aspect-video rounded-xl sm:w-full lg:order-last"
							/>
							<div className="flex flex-col justify-center space-y-4">
								<div className="grid gap-6">
									<div className="grid gap-1">
										<h3 className="text-xl font-bold">The Smith Family</h3>
										<p className="text-muted-foreground">
											&ldquo;Kinsync has been a game-changer for our family. We
											use it to manage our home renovation project and
											it&rsquo;s made the process so much easier.&rdquo;
										</p>
									</div>
									<div className="grid gap-1">
										<h3 className="text-xl font-bold">The Garcia Farm</h3>
										<p className="text-muted-foreground">
											&ldquo;As a family-owned farm, Kinsync has helped us stay
											organized and on top of our seasonal activities. The
											resource sharing and communication tools are
											invaluable.&rdquo;
										</p>
									</div>
									<div className="grid gap-1">
										<h3 className="text-xl font-bold">The Kim Family</h3>
										<p className="text-muted-foreground">
											&ldquo;We love using Kinsync to collaborate on our family
											projects. The mobile app makes it easy to stay connected
											no matter where we are.&rdquo;
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
					<div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
								Bring your family or group together with Kinsync
							</h2>
							<p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Streamline your collaborative projects and stay connected with
								your loved ones.
							</p>
						</div>
						<div className="flex gap-4 lg:justify-end">
							<Link
								href="#"
								className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors rounded-md shadow bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
								prefetch={false}
							>
								Sign Up
							</Link>
							<Link
								href="#"
								className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors border rounded-md shadow-sm border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
								prefetch={false}
							>
								Learn More
							</Link>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
						<div className="space-y-3">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								Get started with Kinsync
							</h2>
							<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Sign up today and start streamlining your family or group
								projects.
							</p>
						</div>
						<div className="w-full max-w-sm mx-auto space-y-2">
							<form className="flex gap-2">
								<Input
									type="email"
									placeholder="Enter your email"
									className="flex-1 max-w-lg"
								/>
								<Button type="submit">Sign Up</Button>
							</form>
							<p className="text-xs text-muted-foreground">
								Sign up to get started. No credit card required.{" "}
								<Link
									href="#"
									className="underline underline-offset-2"
									prefetch={false}
								>
									Terms &amp; Conditions
								</Link>
							</p>
						</div>
					</div>
				</section>
			</main>
			<footer className="flex flex-col items-center w-full gap-2 px-4 py-6 border-t sm:flex-row shrink-0 md:px-6">
				<p className="text-xs text-muted-foreground">
					&copy; 2024 Kinsync. All rights reserved.
				</p>
				<nav className="flex gap-4 sm:ml-auto sm:gap-6">
					<Link
						href="#"
						className="text-xs hover:underline underline-offset-4"
						prefetch={false}
					>
						Terms of Service
					</Link>
					<Link
						href="#"
						className="text-xs hover:underline underline-offset-4"
						prefetch={false}
					>
						Privacy
					</Link>
				</nav>
			</footer>
		</div>
	);
}


