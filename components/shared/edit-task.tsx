"use client";
import { Edit3Icon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

interface Task {
	id: string;
	taskName?: string;
	completed: boolean;
}

interface EditTaskProps {
	task: Task | null;
	isOpen: boolean;
	onClose: () => void;
	onTaskUpdated?: () => void;
}

export default function EditTask({
	task,
	isOpen,
	onClose,
	onTaskUpdated,
}: EditTaskProps) {
	const [taskName, setTaskName] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (task) {
			setTaskName(task.taskName || "");
		}
	}, [task]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!task || !taskName.trim()) return;

		setLoading(true);

		try {
			const res = await fetch(`/api/task/${task.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ taskName }),
			});

			const json = await res.json();

			if (res.ok && json.success) {
				if (typeof onTaskUpdated === "function") {
					onTaskUpdated();
				}
				onClose();
			} else {
				console.error("cannot edit task", json.message);
			}
		} catch (error) {
			console.error("cannot edit task", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-neutral-800 text-white px-8 py-5">
				<DialogHeader className="text-2xl font-bold">Edit Tasks</DialogHeader>
				<form onSubmit={handleSubmit} className="flex flex-col items-end gap-2">
					<input
						type="text"
						value={taskName}
						onChange={(e) => setTaskName(e.target.value)}
						placeholder="Edit your task"
						className="border-neutral-500 border-2 rounded-xl py-2 px-5 w-full text-white"
					/>
					<Button className="bg-green-700" type="submit" disabled={loading}>
						Edit
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
