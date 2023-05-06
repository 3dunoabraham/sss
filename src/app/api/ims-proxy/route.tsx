import { NextRequest } from "next/server"
import { fetchPostWjwt } from "@/../script/util/helper";
import { getJWTCookie } from "@/../script/state/repository/session";

export async function POST(request: NextRequest) {
  const jwt:any = getJWTCookie()

  const { url, data }:any = await request.json()
  const reqRes:any = await fetchPostWjwt(url, data, jwt)
  if (!reqRes) { throw new Error() }

  return new Response(JSON.stringify(reqRes));
}