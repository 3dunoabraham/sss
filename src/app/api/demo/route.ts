import { NextRequest } from "next/server"


import { JWTNAME } from "@/../script/state/repository/auth";

export async function POST(request: NextRequest) {
  const reqRes:any = {
    user: { email:"example@example.com", name: "joe", },
    jwt: `${Math.random()}${Math.random()}`
  }

  const fullRes = new Response(JSON.stringify(reqRes));
  fullRes.headers.append(
    'Set-Cookie', JWTNAME + '=' + reqRes.jwt + '; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=60'
  );

  return fullRes
}

