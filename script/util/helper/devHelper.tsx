let isDevEnvironment = false;

if (process && process.env.NODE_ENV === 'development') {
  isDevEnvironment = true;
}
export const dd = (...args:any)=>{
  if (process.env.ddInConsole) {
    console.log("🖥️→",args.shift());
    console.log(...args)
  }
}
export const dlog = (...args:any)=>{ if (isDevEnvironment && process.env.logInConsole) { console.log("#",...args) } }
export const dtable = (args:any)=>{ if (isDevEnvironment) { console.table(args) } }
export {isDevEnvironment};

// export const ddom = (type="array",...args:any)=>{
//     if (type == "array")
//     {
//         return args.map((X)=><div>{JSON.stringify(X)}</div>)
//     }
//     return <div className="ims-border-fade">empty ddom</div>
// }


export const getRandomUID = ()=>{
  let rdm0 = parseInt(`${(Math.random()*9000 ) + 1000}`)    
  let rdm1 = parseInt(`${(Math.random()*9000 ) + 1000}`)    
  return `${rdm0}-${rdm1}`
}