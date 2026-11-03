import { Button } from "../ui/button";

export default function AddTask() {
	return (
		<form action="post">
			<div className="flex items-center gap-4 min-w-full ">
				<input
					type="text"
					className="border-2 border-neutral-500 bg-white text-neutral-900 rounded-xl py-2 px-4 inset-shadow-neutral-800 inset-shadow-sm min-w-4/5"
				/>
				<Button className="p-5 text-lg bg-transparent border-white-200 inset-shadow-sm inset-shadow-white/90 rounded-xl hover:scale-[0.96] hover:opacity-50">
					Create Task
				</Button>
			</div>
		</form>
	);
}
