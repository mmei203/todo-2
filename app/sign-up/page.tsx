import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUp() {
	return (
		<main className=" p-23 mx-auto text-neutral-900">
			<Card className="p-7 items-center rounded-4xl bg-white text-neutral-900 inset-shadow-sm inset-shadow-neutral-950">
				<CardHeader className="min-w-xs">
					<CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
					<CardDescription>Create your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="space-y-5">
						<div className="flex flex-col gap-2">
							<label htmlFor="username" className="font-semibold">
								Username
							</label>
							<input
								type="text"
								id="username"
								className="outline-2 py-2 px-4 rounded-xl"
								placeholder="JohnDoe123"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="email" className="font-semibold">
								Email
							</label>
							<input
								type="email"
								id="email"
								className="outline-2 py-2 px-4 rounded-xl"
								placeholder="johndoe@gmail.com"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="password" className="font-semibold">
								Password
							</label>
							<input
								type="password"
								id="password"
								className="outline-2 py-2 px-4 rounded-xl"
								placeholder="●●●●●●●●●"
							/>
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<Button className="px-10 py-5 text-lg w-full">Create Account</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
