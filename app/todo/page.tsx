"use client"
import AddTask from "@/components/shared/add-task";
import ShowTasks from "@/components/shared/show-task";
import { useEffect, useState } from "react";

interface Task {
	id: string;
	taskName: string;
}

export default function ToDoList() {
	const [tasks, setTasks] = useState<Task[]>([])

	useEffect(() => {
		fetch("/api/task")
			.then((res) => res.json())
			.then((json) => {
			if(json.success) setTasks(json.data)
		})
	}, [])

	const handleTaskCreated = (newTask: Task) => {
		setTasks((prevTasks) => [newTask, ...prevTasks])
	}

	const handleTaskDeleted = (id: string) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
	}

   return (
			<main className="px-20 py-10 space-y-10">
				{/* add tasks */}
				<section className="space-y-5">
					<h1 className="text-3xl font-bold">Create Tasks</h1>
					<AddTask onTaskCreated={handleTaskCreated}/>
				</section>
				{/* Task Lists */}
				<section className="border-t-5 border-neutral-700 py-5 space-y-5">
            <h1 className="text-3xl font-bold">Tasks</h1>
            <ShowTasks tasks={tasks} onDelete={handleTaskDeleted}/>
				</section>
			</main>
		);
}