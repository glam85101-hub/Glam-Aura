import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Dummy registration endpoint to prevent 404 errors from RegisterClient
  // In a real app, this would save the user to a database.
  console.log("Registration endpoint called");
  return NextResponse.json({ message: "Registration successful" }, { status: 200 });
}
