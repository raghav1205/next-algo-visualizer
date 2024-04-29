import { NextRequest } from "next/server";
import prisma from "@/db";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
         await prisma.solution.create({
            data: {
                problemId: body?.problemId,
                language: body?.language,
                code: body?.code,
            }
        });
        return Response.json({ message: "Success" });
    }
    catch (e) {
        console.log(e);
        return Response.json({ message: e });
    }
}

