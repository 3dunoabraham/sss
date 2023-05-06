"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { AppContext } from "@/../script/state/context/AppContext";


function Component ({}) {
  const [loading, s__loading]:any = useState()
  
  return (
    <div className='flex w-100 flex-justify-stretch h-min-100vh  pos-abs pa-8 '>
      
      <Link className='tx-xl tx-center tx-white flex-col opaci-chov--75 flex-1 noverflow bord-r-8'
        href="https://demo.servicepad.com/agreements" style={{background:"#3E5F58"}}
        target="_blank" rel="noreferrer" 
      >
        <div className="flex gap-3 tx-lx"><FaExternalLinkAlt /> Enter</div> <br /> PORTAL
      </Link>

      <Link onClick={()=>{s__loading("inventory")}} href="/inventory" 
        className={`tx-xl tx-center  flex-col  noverflow bord-r-8 bg-b-hov-10 flex-1 
          ${loading != "inventory" ? "tx-gray" : "ims-tx-primary "}
        `}
      >
        {loading == "inventory"
          ? <div className="shake-1">Loading...</div>
          : <div>Enter</div>
        }
        <br /> INVENTORY
      </Link>

    </div>
  )
}

export default Component