"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface Task {
	id: string;
	taskName: string;
	completed: boolean;
}
interface AddTaskFormProps {
	onTaskCreated: (newTask: Task) => void;
}

export default function AddTask({ onTaskCreated }: AddTaskFormProps) {
	const [newTask, setNewTask] = useState("");
	const [loading, setLoading] = useState(false);

	const handleCreate = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newTask.trim()) return;

		setLoading(true);

		try {
			const res = await fetch("/api/task", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ taskName: newTask }),
			});

			const json = await res.json();
			if (json.success) {
				onTaskCreated(json.data);
				setNewTask("");
			}
		} catch (error) {
			console.error("Failed to add Task", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleCreate}>
			<div className="flex items-center gap-4 min-w-full ">
				<input
					type="text"
					className="border-2 border-neutral-500 bg-white text-neutral-900 rounded-xl py-2 px-4 inset-shadow-neutral-800 inset-shadow-sm min-w-4/5"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
				/>
				<Button
					className="p-5 text-lg bg-transparent border-white-200 inset-shadow-sm inset-shadow-white/90 rounded-xl hover:scale-[0.96] hover:opacity-50"
					type="submit"
					disabled={loading}
				>
					Create Task
				</Button>
			</div>
		</form>
	);
}
