import { NextRequest } from "next/server"
import { fetchRepos } from "../../../../script/state/repository/repos";


// import { JWTNAME } from "@/../script/state/repository/auth";

export async function GET(request: NextRequest) {
    const reqRes:any = await fetchRepos()
//   const reqRes:any = {
//     user: { email:"example@example.com", name: "joe", },
//     jwt: `${Math.random()}${Math.random()}`
//   }

  const fullRes = new Response(JSON.stringify(reqRes));
//   fullRes.headers.append(
//     'Set-Cookie', JWTNAME + '=' + reqRes.jwt + '; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=60'
//   );

  return fullRes
}

