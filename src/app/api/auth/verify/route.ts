import { NextRequest } from "next/server"

import { fetchUser } from '@/../script/state/repository/auth';
import { getJWTCookie } from "@/../script/state/repository/session";

export async function POST(request: NextRequest) {
  const jwt:any = getJWTCookie()

  const reqRes:any = await fetchUser(jwt)
  if (!reqRes) { throw new Error() }

  return new Response(JSON.stringify(reqRes))
}

