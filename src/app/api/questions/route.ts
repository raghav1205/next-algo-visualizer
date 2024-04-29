import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        const data = await prisma.problem.create({
            data: {
                title: body?.title,
                explanation: body?.explanation,
                description: body?.description,
                componentName: body?.componentName,
            },
        });
        return Response.json({ message: "Success" });
    }
    catch (e) {
        console.log(e);
        return Response.json({ message: e });
    }
}

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    console.log(url)
    const data = await prisma.problem.findMany();
    return NextResponse.json(data);
}

