
function Component ({}) {
    return (
        <>
        <h1 className=''>
            <div> An example of  </div>
            <div> synced data </div>
            <div> on the Web </div>
          </h1>
          <h2 className='pt-3 tx-bold-3'> Abraham Duno</h2>
          <h4 className='pb-3 tx-bold-3'> May 6th 2023</h4>
          <div className='flex-wrap gap-1 flex-justify-start tx-smd opaci-50'>
            <div> Have you ever wondered how </div>
            <div> websites display up-to-date data? </div>
          </div>
          <div className='flex-wrap gap-1 flex-justify-start pt-3 tx-mdl  '>
            <div>This app highlights the  </div>
            <div>data layers of a </div>
            <a href="https://dev.to/3dunoabraham/sss" target='_blank'> 
              super synced software
            </a>
          </div>
          <div className='flex-col flex-justify-start flex-align-start gap-2 pt-8 pb-4'>
            <div className='tx-lg'>Data mutability: </div>
            <div className='flex gap-2'>
              <div className='px-2 py-1 bord-r-8 tx-white' style={{ background: "#0099ff" }}>Hardcoded</div>
              <div className='px-2 py-1 bord-r-8 tx-white' style={{ background: "#ff9900" }}>Live</div>
            </div>

          </div>
        </>
    )
}

export default Component