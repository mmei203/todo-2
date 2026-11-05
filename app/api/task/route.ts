import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// GET DATA
export async function GET(req: Request) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			return NextResponse.json(
				{ success: false, message: "Unauthorized" },
				{ status: 401 },
			);
		}

		const tasks = await prisma.task.findMany({
			where: { userId: session.user.id },
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json({ success: true, data: tasks }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: "failed to fetch data" },
			{ status: 500 },
		);
	}
}

// POST DATA
export async function POST(req: Request) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			return NextResponse.json(
				{ success: false, message: "Unauthorized" },
				{ status: 401 },
			);
		}

		const body = await req.json();
		const { taskName, description } = body;

		if (!taskName) {
			return NextResponse.json(
				{ message: "u have to fill it mijo" },
				{ status: 201 },
			);
		}

		const newTask = await prisma.task.create({
			data: {
				taskName,
				description,
				userId: session.user.id,
			},
		});

		return NextResponse.json(
			{ success: true, message: "Task created!", data: newTask },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: "failed to add task" },
			{ status: 500 },
		);
	}
}
