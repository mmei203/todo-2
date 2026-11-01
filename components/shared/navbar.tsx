import { ClipboardList } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
	return (
		<nav className="text-white px-20 py-5 shadow-2xl shadow-white/20 flex justify-between">
			<div className="flex items-center gap-3">
				<ClipboardList />
				<Link href="/">
					<h1 className="text-2xl font-bold">To Do List</h1>
				</Link>
			</div>
			<div className="flex gap-5">
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
			</div>
		</nav>
	);
}
