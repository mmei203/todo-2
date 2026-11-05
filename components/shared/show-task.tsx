"use client";
import { Edit, Edit3Icon, Trash } from "lucide-react";
import { Button } from "../ui/button";
import EditTask from "./edit-task";
import { useState } from "react";

interface Task {
	id: string;
	taskName?: string;
	completed: boolean;
}

interface TaskListProps {
	tasks: Task[];
	onDelete: (id: string) => void;
	onChanged?: () => void;
}

export default function ShowTasks({
	tasks,
	onDelete,
	onChanged,
}: TaskListProps) {
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [isDialogOpen, setDialogOpen] = useState(false);

	const toggleCompleted = async (id: string, currentStatus: boolean) => {
		try {
			const res = await fetch(`api/task/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ completed: !currentStatus }),
			});

			const json = await res.json();
			if (res.ok && json.success) {
				if (typeof onChanged === "function") {
					onChanged();
				}
			};
		} catch (error) {
			console.error("failed to update", error);
		}
	};

	const handleDeleteClick = async (id: string) => {
		try {
			const res = await fetch(`/api/task/${id}`, { method: "DELETE" });
			const json = await res.json();

			if (res.ok) {
				onDelete(id);
			} else {
				alert(json.message);
			}
		} catch (error) {
			console.error("error: ", error);
		}
	};

	return (
		<div className="space-y-3">
			{tasks.map((task) => (
				<div key={task.id} className="flex items-center justify-between">
					<div className="flex items-center text-lg gap-4">
						<input
							type="checkbox"
							checked={task.completed}
							onChange={() => toggleCompleted(task.id, task.completed)}
							className="size-7 rounded-xl"
						/>
						<p>{task.taskName}</p>
					</div>
					<div className="space-x-4">
						<Button
							className="bg-green-800 p-2 rounded-lg"
							onClick={() => {
								setSelectedTask(task);
								setDialogOpen(true);
							}}
						>
							<Edit3Icon size={18} />
						</Button>
						<Button
							size="icon-lg"
							className="bg-destructive"
							onClick={() => handleDeleteClick(task.id)}
						>
							<Trash />
						</Button>
					</div>
				</div>
			))}
			<EditTask
				task={selectedTask}
				isOpen={isDialogOpen}
				onClose={() => {
					setSelectedTask(null);
					setDialogOpen(false);
				}}
				onTaskUpdated={onChanged}
			/>
		</div>
	);
}
