import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const { userId } = await auth(); 

    if (!userId) {
      return new Response("Not signed in", { status: 401 });
    }

    // Clerk ka user object lo
    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress ?? "no-email@placeholder.com";

    // DB me check karo
    let dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: userId,
          email,
        },
      });
    }

    return Response.json(dbUser);
  } catch (error) {
    console.error(error);
    return new Response("Failed to register user", { status: 500 });
  }
}
