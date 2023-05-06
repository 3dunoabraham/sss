export const parseDecimals = (x:number) => {
  x = parseFloat(`${x}`)
  if (x == 0) return 0
  if (x < 0.000001)
  {
    return 0
  }
  if (x < 0.00001)
  {
    // console.log("*number* TOO LOW", x)
    return x.toFixed(8)
  }
  if (x < 0.0001)
  {
    return x.toFixed(7)
  }
  if (x < 0.001)
  {
    return x.toFixed(6)
  }
  if (x < 0.01)
  {
    return x.toFixed(5)
  }
  if (x < 0.1)
  {
    return x.toFixed(5)
  }
  if (x < 1)
  {
    return x.toFixed(4)
  }
  if (x < 50)
  {
    return x.toFixed(3)
  }
  if (x < 100)
  {
    return x.toFixed(2)
  }
  if (x < 10000)
  {
    return x.toFixed(1)
  }
  return parseInt(`${x}`)
};
  

export async function fetchMultipleJsonArray(requestsObj:any) {
  let reqKeys =  Object.keys(requestsObj)
  let requests =  Object.keys(requestsObj).map((reqKey) => {
    // console.log("requestsObj[reqKey][0]", requestsObj[reqKey][0])
    return fetch(requestsObj[reqKey][0])
  })
  return Promise.all(requests).then((responsesArray) => {
    return Promise.all(reqKeys.map((r,index) => responsesArray[index].json()))
  })
}




export const parseArray = (_obj:any)=>{
  return _obj && Array.isArray(_obj) ? _obj : []
}

export const fetchDelete = async (url:any,body = {})=>{
  try {
      let fetchRes = await fetch(url, {
          headers:{"Content-Type":"application/json"},
          method: 'DELETE',body:JSON.stringify(body)
      })
      return fetchRes
  } catch (err) {
      // dd(err)
      return err
  }
}
export async function PostData(url = '', data = {}, method = "POST") {
  try {
      const response = await fetch(url, {
          headers: {"Content-Type": "application/json"},
          method,
          body: JSON.stringify(data),
      });
      const ress = await response;
      return ress
  } catch (err) {
      // dd(err)
      return err
  }
}
export const fetchPut = async (url:any,body:any)=>{
  try {
      let fetchRes = await fetch(url, {
          headers:{"Content-Type":"application/json"},
          method: 'PUT',body:JSON.stringify(body)
      })
      return await fetchRes
  } catch (err) {
      // dd(err)
      return err
  }
}
export const fetchGet = async (url:any,body={})=>{
  try {
      let fetchRes = await fetch(url, {
          headers:{"Content-Type":"application/json"},
          method: 'PUT',body:JSON.stringify(body)
      })
      return await fetchRes
  } catch (err) {
      // dd(err)
      return err
  }
}
export const fetchPost = async (url:any,body:any)=>{
  try {
      let fetchRes = await fetch(url, {
          headers:{"Content-Type":"application/json"},
          method: 'POST',body:JSON.stringify(body)
      })
      return fetchRes
  } catch (err) {
      // dd(err)
      return err
  }
}
export async function fetchPostWjwt (url:any,body:any,jwt:any) {
try {
  const reqRes = await fetch(url,{
    headers: {
      "Content-Type":"application/json",
      Authorization: 'Bearer ' + jwt,
      body:JSON.stringify(body)
    },
  })
  let awaitedRes = (await reqRes.clone().json())
  return awaitedRes
} catch (e:any) {
  console.log("reqRes catch (e:any)", e)
  return null
}
}


export const fetchPostImage = async (url:any,file:any,config:any)=>{
  return new Promise(async (resolve, reject) => {
      try {
          const payload = new FormData();
          console.log("config", config)
          payload.append(config.fieldName || "img", file, file.name);

          const req = new XMLHttpRequest();
          req.open('POST', url);
          req.setRequestHeader("Authorization", `Bearer ${config.jwt}`);

          req.onreadystatechange = config.onReady
          req.upload.addEventListener('progress', config.onProgress)
          resolve({req,payload})
      } catch (err) {
          // dd(err)
          reject(err)
      }
  })
}
export function returnError(_a:any,err:any,theUrl:any,returnNull = false) {
  console.log("error fetching: "+theUrl,err)
  return returnNull ? null : _a
}
export async function fetchJsonArray(theUrl:any, propName = "", returnNull = false) {
  try {
      let theRequest = await fetch(theUrl);
      let headerCType = theRequest.headers.get("content-type");
      if (!headerCType) return returnError([],{err:"contentType"},theUrl,returnNull)
      let succesfullJsonResponse = headerCType.includes("application/json")
      if (!succesfullJsonResponse) return returnError([],{err:"json"},theUrl,returnNull)
      let theJsonResult = await theRequest.json()
      let theParsedResult = propName == "" ? theJsonResult : theJsonResult[propName]
      if (propName != "" && !(propName in theJsonResult)) { return returnError([],{},theUrl,returnNull) }
      return theParsedResult
  } catch (err) {
      console.log("returnNull?????????")
      return returnNull ? null : returnError([],err,theUrl,returnNull)
  }
}
export async function fetchDownload(url:any, filename:any) {
  fetch(url).then(function(t) {
      return t.blob().then((b)=>{
          var a = document.createElement("a");
          a.href = URL.createObjectURL(b);
          a.setAttribute("download", filename);
          a.click();
      }
      );
  });
}