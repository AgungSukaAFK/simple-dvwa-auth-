import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  return Response.json({ message: "Hello", success: false });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body?.username && body?.password) {
    console.log(body);
  } else {
    console.log("Kosong");
  }

  if (body.username === "admin" && body.password === "admin") {
    const token = jwt.sign({ username: body.username }, "secret", {
      expiresIn: "1h",
    });
    (await cookies()).set("session", token, {
      maxAge: 60 * 60, // 1 jam
    });
    return Response.json({ message: "LOGIN", success: true });
  }
  return Response.json({ message: "LOGIN", success: false });
}
