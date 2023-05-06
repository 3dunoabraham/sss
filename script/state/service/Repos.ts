const LOCAL_API_URL = "/api/"


async function getRepos () {
  try {
    console.log("getting repos from local endpoint")
    const reqRes = await fetch(LOCAL_API_URL+"/repos",)
    console.log("getting repos reqRes", reqRes)
    return await reqRes.json()
  } catch (e:any) {
    console.log("getting errr", e)
    return null
  }
}

export default {
  getRepos,
}