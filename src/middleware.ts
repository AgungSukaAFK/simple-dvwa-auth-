import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname.split("/") || [];
  if (url[1] === "dashboard") {
    console.log("Wadawe");
    const session = req.cookies.get("session")?.value;
    if (!session) {
      return Response.redirect(`http://localhost:3000/ilegal`);
    } else {
      const decoded = jwt.decode(session);
      if (!decoded) {
        return Response.redirect(`http://localhost:3000/ilegal`);
      } else {
        console.log(decoded);
      }
    }
  }
}
