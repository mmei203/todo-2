"use client";

import { ClipboardList } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Navbar() {
	const { data: session } = useSession();
	const router = useRouter();

	return (
		<nav className="text-white px-20 py-5 shadow-2xl shadow-white/20 flex justify-between">
			<div className="flex items-center gap-3">
				<ClipboardList />
				<Link href="/">
					<h1 className="text-2xl font-bold">To Do List</h1>
				</Link>
			</div>
			<div className="flex gap-5">
				{session?.user ? (
					<>
						<DropdownMenu>
							<DropdownMenuTrigger className="focus-within:scale-95">
								<Avatar>
									<AvatarFallback>
										{session.user.name[0].toUpperCase()}
									</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="min-w-3xs">
								<DropdownMenuGroup className="space-y-5 px-4 py-2">
									<DropdownMenuLabel>
										<div>
											<p className="text-neutral-900 text-lg">
												Welcome back, {session.user.name}
											</p>
											<p>{session.user.email}</p>
										</div>
									</DropdownMenuLabel>
									<Button
										variant="destructive"
										onClick={async () => {
											await authClient.signOut({
												fetchOptions: {
													onSuccess: () => router.push("/"),
												},
											});
										}}
									>
										Sign Out
									</Button>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</>
				) : (
					<>
						<Link href="/login">
							<Button className="p-5 text-lg bg-transparent border-white-200 inset-shadow-sm inset-shadow-white/90 rounded-xl hover:scale-[0.96] hover:opacity-50">
								Login
							</Button>
						</Link>
						<Link href="/sign-up">
							<Button className="p-5 text-lg font-semibold bg-white text-neutral-900 inset-shadow-sm inset-shadow-neutral-700 rounded-xl hover:opacity-50 hover:bg-white hover:scale-[0.96]">
								Get Started
							</Button>
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}
