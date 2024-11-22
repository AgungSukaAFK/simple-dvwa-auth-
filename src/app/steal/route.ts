import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  return Response.json({ message: "ahay", success: false });
}
