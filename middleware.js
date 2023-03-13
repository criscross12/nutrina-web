import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("user");
  if (!jwt) return NextResponse.redirect(new URL("/", request.url));

  // this condition avoid to show the login page if the user is logged in
  // if (jwt) {
  //   if (request.nextUrl.pathname.includes("/login")) {
  //     try {
  //       await jwtVerify(
  //         jwt,
  //         new TextEncoder().encode("d2-4f29-9e62-0383b3011863")
  //       );
  //       return NextResponse.redirect(new URL("/patients", request.url));
  //     } catch (error) {
  //       return NextResponse.next();
  //     }
  //   }
  // }

  // try {
  //   const { payload } = await jwtVerify(
  //     jwt,
  //     new TextEncoder().encode("d2-4f29-9e62-0383b3011863")
  //   );
  //   console.log({ payload });
  //   return NextResponse.next();
  // } catch (error) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
}

export const config = {
  matcher: ["/admin/:path*", "/patients:path*"],
};
