import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const todo = await prisma.todo.findFirst({
    where: { id: params.id, userId: session.user.id },
  });

  if (!todo) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json();
  const updated = await prisma.todo.update({
    where: { id: params.id },
    data: {
      ...(typeof body.completed === "boolean" && { completed: body.completed }),
      ...(typeof body.title === "string" && body.title.trim() && { title: body.title.trim() }),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const todo = await prisma.todo.findFirst({
    where: { id: params.id, userId: session.user.id },
  });

  if (!todo) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.todo.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}
