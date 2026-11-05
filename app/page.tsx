import { Button } from "@/components/ui/button";
import { getSession } from "better-auth/api";
import Link from "next/link";

export default function Home() {
	const { data: session } = getSession();
	return (
		<main>
			{/* Hero Sect */}
			<section className="text-white flex flex-col items-center justify-center min-h-[70vh] p-32">
				{session?.user ? (
					<>
						<h1 className="text-6xl font-bold">To Do List</h1>
						<p className="m-4 text-xl">
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Delectus, enim?
						</p>
						<div className="mt-10">
							<Link href="/sign-up">
								<Button className=" text-2xl p-7 bg-transparent border-2 border-white-200 inset-shadow-sm inset-shadow-white/90 rounded-3xl hover:scale-[0.98] hover:bg-white hover:text-neutral-900 hover:inset-shadow-sm hover:inset-shadow-neutral-700 hover:border-none">
									Get Started
								</Button>
							</Link>
						</div>
					</>
				) : (
					<>
						<h1 className="text-6xl font-bold">To Do List</h1>
						<p className="m-4 text-xl">
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Delectus, enim?
						</p>
						<div className="mt-10">
							<Link href="/todo">
								<Button className=" text-2xl p-7 bg-transparent border-2 border-white-200 inset-shadow-sm inset-shadow-white/90 rounded-3xl hover:scale-[0.98] hover:bg-white hover:text-neutral-900 hover:inset-shadow-sm hover:inset-shadow-neutral-700 hover:border-none">
									To Do List
								</Button>
							</Link>
						</div>
					</>
				)}
			</section>
		</main>
	);
}

