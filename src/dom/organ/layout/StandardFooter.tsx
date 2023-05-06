import { INSTITUTION } from "@/../script/constant"


function Component ({}) {
  return (
    <div className='py-8 px-4 flex-wrap flex-justify-center flex-align-center gap-6  w-100 '>
      <div className='flex-wrap'>
        <div className='opaci-50 nowrap'>{INSTITUTION.titleSupport}</div>
        <div className='opaci-50 nowrap'>{INSTITUTION.email}</div>
      </div>
      <div className='opaci-50  '>{INSTITUTION.copyrights}</div>
    </div>
  )
}

export default Component