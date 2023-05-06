import { NextRequest } from "next/server"


import CONSTANTS from '@/../script/constant/json/api.json'
import { JWTNAME, fetchLogin } from '@/../script/state/repository/auth';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  const jwt:any = await fetchLogin({ email, password, })
  if (!jwt) { throw new Error() }
  
  let bodyResponse = { jwt,
    user: {
      email, apiname: process.env.AUTH_API_NAME || CONSTANTS.AUTH_API_NAME,
      rolname: "root",
    },
  }
  const fullRes:any = new Response(JSON.stringify(bodyResponse), {
    status: 200,
    headers: {
      'Set-Cookie': [
        `${JWTNAME}=${jwt}; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=3600`,
      ].join('; ') // Convert array to string
    }
  });
  fullRes.headers.append(
    'Set-Cookie',
    `user=${JSON.stringify(bodyResponse.user)}; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=3600`
  );
    return fullRes
  
}