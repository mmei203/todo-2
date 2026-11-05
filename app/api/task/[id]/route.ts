import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
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

		const { id } = await params;

		const existing = await prisma.task.findFirst({
			where: { id: id, userId: session.user.id },
		});

		if (!existing) {
			return NextResponse.json({
				success: false,
				message: "the task is not exist mijo",
			});
		}

		await prisma.task.delete({ where: { id: id } });

		return NextResponse.json(
			{
				success: true,
				message: "task deleted mijo",
			},
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: "we can't delete the task mijo",
			},
			{ status: 500 },
		);
	}
}

// UPDATE
export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
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

		const { id } = await params;
		const { taskName, completed } = await req.json();

		const existing = await prisma.task.findFirst({
			where: {
				id,
				userId: session.user.id,
			},
		});

		if (!existing) {
			return NextResponse.json({
				success: false,
				message: "the task is not exist mijo",
			});
		}

		const updatedTask = await prisma.task.update({
			where: { id },
			data: {
				...(taskName !== undefined && {taskName}),
				...(completed !== undefined && {completed})
			}
		});

		return NextResponse.json(
			{
				success: true,
				message: "task updated mijo",
				data: updatedTask
			},
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: "we can't edit the task mijo",
			},
			{ status: 500 },
		);
	}
}
