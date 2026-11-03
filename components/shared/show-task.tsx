import { Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

export default function ShowTasks() {
	const tasks = [
		{
			id: 1,
			taskname: "task 1",
			description: "bleh bleh bleh",
		},
		{
			id: 2,
			taskname: "task 2",
			description: "bleh bleh bleh",
		},
		{
			id: 3,
			taskname: "task 3",
			description: "bleh bleh bleh",
		},
	];
	return (
		<div className="space-y-3">
			{tasks.map((task) => (
				<div key={task.id} className="flex items-center justify-between">
					<div className="flex items-center text-lg gap-4">
						<input
							type="checkbox"
							name=""
							id=""
							className="size-7 rounded-xl"
						/>
						<p>{task.taskname}</p>
					</div>
					<div className="space-x-4">
						<Button size="icon-lg" className="bg-green-900">
							<Edit size={40} />
						</Button>
						<Button size="icon-lg" className="bg-destructive">
							<Trash />
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}
