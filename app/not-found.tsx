import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<main>
			{/* Hero Sect */}
			<section className="text-white flex flex-col items-center justify-center min-h-[70vh] p-32">
				<h1 className="text-6xl font-bold m-5">404 | Page Not Found</h1>
            <Link href="/">
               <Button variant='link' className="text-white text-lg">Go Back</Button>
            </Link>
			</section>
		</main>
	);
}
