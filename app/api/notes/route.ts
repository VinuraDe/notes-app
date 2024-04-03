import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const body = await req.json();
    console.log("Request body:", body);

    const { title, description, favourite } = body;

    if (!title || !description) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }

    const note = await prisma.note.create({
      data: {
        title,
        description,
        isFavourite: favourite,
        userId,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating note", status: 500 });
  }
}



export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const notes = await prisma.note.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.log("ERROR GETTING TASKS: ", error);
    return NextResponse.json({ error: "Error updating note", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const { isFavourite, id } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const note = await prisma.note.update({
      where: {
        id,
      },
      data: {
        isFavourite,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error deleting note", status: 500 });
  }
}
