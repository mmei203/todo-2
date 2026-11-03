import { Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";

interface Task {
	id: string,
	taskName?: string
}

interface TaskListProps {
	tasks: Task[]
	onDelete: (id:string) => void
}

export default function ShowTasks({tasks, onDelete}: TaskListProps) {
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
						<p>{task.taskName}</p>
					</div>
					<div className="space-x-4">
						<Button size="icon-lg" className="bg-green-900">
							<Edit size={40} />
						</Button>
						<Button size="icon-lg" className="bg-destructive" onClick={() => onDelete(task.id)}>
							<Trash />
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}
