import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return Response.json(users);
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch users", { status: 500 });
  }
}
