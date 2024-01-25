import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const role = await currentRole();
  if (role === UserRole.ADMIN) {
    return new NextResponse(JSON.stringify("Allowed API Route"), {
      status: 200,
    });
  }
  return new NextResponse(JSON.stringify("Forbidden API Route"), {
    status: 403,
  });
}
