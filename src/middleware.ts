import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { GetServerSidePropsContext } from 'next';


import { JWTNAME, fetchUser } from '@/../script/state/repository/auth';

function goHome(req:any) {
  const url = req.nextUrl.clone();
  url.pathname = "/"; url.search = ""
  return NextResponse.redirect(url)
}
function goHomeClearCookie(req:any) {
  const url = req.nextUrl.clone();
  url.pathname = "/"; url.search = ""
  if (!!url.headers) {
    url.headers.set("Set-Cookie", JWTNAME + `; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=0`)
  }
  return NextResponse.redirect(url)
}

export async function middleware(req: NextRequest, context: GetServerSidePropsContext) {
  let sessiontoken = req.cookies.get(JWTNAME)?.value;
  if (!sessiontoken) { return goHome(req) }
  
  // const userResponse = await fetchUser(sessiontoken)
  // let userdata = userResponse
  // if (!userdata) { return goHomeClearCookie(req) }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/unit/add', '/unit/:path*', '/inventory'
  ],
}