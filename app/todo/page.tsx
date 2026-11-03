import AddTask from "@/components/shared/add-task";
import ShowTasks from "@/components/shared/show-task";

export default function ToDoList() {
   return (
			<main className="px-20 py-10 space-y-10">
				{/* add tasks */}
				<section className="space-y-5">
					<h1 className="text-3xl font-bold">Create Tasks</h1>
					<AddTask />
				</section>
				{/* Task Lists */}
				<section className="border-t-5 border-neutral-700 py-5 space-y-5">
            <h1 className="text-3xl font-bold">Tasks</h1>
            <ShowTasks/>
				</section>
			</main>
		);
}