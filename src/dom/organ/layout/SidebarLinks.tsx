"use client";

import Link from "next/link";
import { BsBox, BsHouse, BsStack, BsPeople, BsFiles, BsHandIndexThumb } from 'react-icons/bs'
import { SlEnvolopeLetter } from 'react-icons/sl'
import { BiUserPin } from 'react-icons/bi'
import dynamic from "next/dynamic";
import { useState } from "react";
import router, { usePathname } from 'next/navigation'

function Component ({ links } : any) {
  
  const pathname = usePathname();
    const IconSwitch:any = {
    home: <BsHouse />,
    agreements: <BsFiles />,
    inventory: <BsStack />,
    users: <BsPeople />,
    unit: <BsBox />,
    roles: <BiUserPin />,
    actions: <BsHandIndexThumb />,
    permissions: <SlEnvolopeLetter />,
  }
  const [loading, s__loading] = useState()

  return (
    <div className='flex-col flex-align-stretch   w-100 '>
      
      {links.map((aLink:any, index:any) => {
        return (
          <Link key={index} className={'nodeco  bg-w-hov-50 px-2 py-3 block tx-white gap-2 flex '+`
            ${pathname == aLink.url ? " bg-w-10 " : ""}
          `}
            onClick={()=>{pathname == aLink.url ? null : s__loading(aLink.label)}}
            href={aLink.url}
          >
            <div className='px-2 flex'>
              {aLink.label == loading && <div className="spin-1">-</div>}
              <div className={`px-2 ${aLink.iconClass}`}>{IconSwitch[aLink.icon]}</div>
              <div className="Q_lg_x">{aLink.label}</div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Component