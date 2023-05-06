import AppClientDesc from "@/dom/organ/auth/AppClientDesc";
import LoginBtn from "@/dom/organ/auth/LoginBtn";
import Link from "next/link";
import Image from "next/image";
import { BsBook, BsBox, BsFillArchiveFill, BsGear, BsInfoCircle, BsPerson, BsStack } from "react-icons/bs";
import { useRouter } from "next/router";
import { InventoryContext } from "@/../script/state/context/InventoryContext";
import { useContext, useEffect, useMemo } from "react";
import { AppContext } from "@/../script/state/context/AppContext";
import { MdOutlineInventory2 } from "react-icons/md";
import { useIsClient } from "usehooks-ts";
import { isDevEnvironment } from "@/../script/util/helper/devHelper";
// import SPLoginBtn from "../molecules/auth/SPLoginBtn";

export default function Component({}) {
    const router = useRouter();
    const handleClick = async (newUrl:any,...args:any) => {
      await router.push(newUrl);
    } 
    const isClient = useIsClient()
    const app:any = useContext(AppContext)
    const inv = useContext(InventoryContext)
    const ICONS:any = {
        agreements: <BsStack />,
        users: <BsPerson />,
        builder3d: <BsBox />,
        inventory: <MdOutlineInventory2 />,
    }
    
    return (<>
        <div className="flex-col  Q_sm_x invisible ">
            <div className='flex px-3 px- w-100'>
                
                {/* <button onClick={()=>{handleClick("/")}} className='tx-white  tx-lgx nodeco py-4 flex-center '>
                    <div className='bg-white px-1 pt-1 bord-r-10 scale-90'>
                        <Image src='/icons/logo.svg' alt='next' width='28' height='28'/>
                    </div>
                    <div className='Q_lg_x pl-1'>
                        <Image src='/icons/Vector.png' alt='next' width='129' height='19'/>
                    </div>
                </button> */}
                
                <Link href="/" className='tx-white  tx-lgx nodeco py-4 flex-center '>
                    <div className='bg-white px-1 pt-1 bord-r-10 scale-90'>
                        <Image src='/icons/logo.svg' alt='next' width='28' height='28'/>
                    </div>
                    <div className='Q_lg_x pl-1'>
                        <Image src='/icons/Vector.png' alt='next' width='129' height='19'/>
                    </div>
                </Link>
            </div>
            <div className='flex-1'>
                {!!app && !!app.sidebarPages && app.sidebarPages.map((aLink:any, index:any)=>{
                        return (
                            <Link href="/users/" className="flex-center py-3 clickble  px-2 bg-w-hov-10  " key={index}>
                                <div className=" pr-3  Q_lg_x"></div>
                                <div className="px-1 tx-center tx-lg opaci-hov--50">{aLink.icon ? ICONS[aLink.icon]: <BsPerson /> }</div>
                                {/* <div className="flex-1 pl-3 Q_lg_x w-min-220px">{aLink.url}</div> */}
                                <div className="flex-1 pl-3 Q_lg_x w-min-220px">{aLink.label}</div>
                            </Link>
                        )
                    }) }
                    
                {!!app && !!app.sidebarLinks && app.sidebarLinks.length == 0 && 
                    <div className="flex-center py-1 clickble  px-2 bg-w-50   " >
                        <div className=" pr-3  Q_lg_x"></div>
                        <div className="px-1 tx-center tx-lg opaci-hov--50"><BsFillArchiveFill /></div>
                        <div className="flex-1 pl-3 Q_lg_x w-min-220px">asd</div>
                    </div>
                }
            </div>
        </div>

        <div className="h-100vh flex-col pos-fix top-0  left-0 Q_sm_x ">
            <div className='flex px-3 px- w-100'>
                {/* <button onClick={()=>{handleClick("/")}} className='tx-white  tx-lgx nodeco py-4 flex-center '>
                    <div className='bg-white px-1 pt-1 bord-r-10 scale-90'>
                        <Image src='/icons/logo.svg' alt='next' width='28' height='28'/>
                    </div>
                    <div className='Q_lg_x pl-1'>
                        <Image src='/icons/Vector.png' alt='next' width='129' height='19'/>
                    </div>
                </button> */}
                
                <Link href="/" className='tx-white  tx-lgx nodeco py-4 flex-center '>
                    <div className='bg-white px-1 pt-1 bord-r-10 scale-90'>
                        <Image src='/icons/logo.svg' alt='next' width='28' height='28'/>
                    </div>
                    <div className='Q_lg_x pl-1'>
                        <Image src='/icons/Vector.png' alt='next' width='129' height='19'/>
                    </div>
                </Link>
            </div>
            <div className='flex-1'>
                
                {!!app && !!app.sidebarPages && app.sidebarPages.map((aLink:any, index:any)=>{
                    return (
                        <Link href={aLink.url || "#"} className="flex-center py-3 clickble  px-2 bg-w-hov-10  " key={index}>
                            <div className=" pr-3  Q_lg_x"></div>
                            <div className="px-1 tx-center tx-lg opaci-hov--50">{aLink.icon ? ICONS[aLink.icon]: <BsPerson /> }</div>
                            {/* <div className="flex-1 pl-3 Q_lg_x w-min-220px">{aLink.url}</div> */}
                            <div className="flex-1 pl-3 Q_lg_x w-min-220px">{aLink.label}</div>
                        </Link>
                    )
                }) }
                <hr className="w-100 opaci-10 my-3" style={{borderColor: "white"}} />
                
                {!!app && !!app.sidebarLinks && app.sidebarLinks.map((anUnit:any, index:any)=>{
                    if (router.query.key == anUnit.label) { return (
                        <div key={index} className="flex-center py-1 clickble  px-2 bg-w-50   " >
                            <div className=" pr-3  Q_lg_x"></div>
                            <div className="px-1 tx-center tx-lg opaci-hov--50"><BsFillArchiveFill /></div>
                            <div className="flex-1 pl-3 Q_lg_x w-min-220px">{anUnit.label.replace("_"," ").toUpperCase()}</div>
                        </div>
                    )}
                    return (
                    <Link key={index}  className="flex-center py-1 clickble  px-2 bg-w-hov-10  " href={`${anUnit.src}`} >
                        <div className=" pr-3  Q_lg_x"></div>
                        <div className="px-1 tx-center tx- opaci-hov--50"><BsFillArchiveFill /></div>
                        <div className="flex-1 pl-3 Q_lg_x w-min-220px">{anUnit.label.replace("_"," ").toUpperCase()}</div>
                    </Link>
                    )
                })}
            </div>
            <div className=''>
                {/* <Link href="/#" className="flex-center py-2 clickble  px-2 bg-w-hov-10  ">
                    <div className=" pr-3  Q_lg_x"></div>
                    <div className="px-1 tx-center tx-lg opaci-hov--50"><BsInfoCircle /></div>
                    <div className="flex-1 pl-1 Q_lg_x w-min-220px">Support</div>
                </Link> */}
                {/* <Link href="/docs/" className="flex-center py-2 clickble  px-2 bg-w-hov-10  ">
                    <div className=" pr-3  Q_lg_x"></div>
                    <div className="px-1 tx-center tx-lg opaci-hov--50"><BsBook /></div>
                    <div className="flex-1 pl-1 Q_lg_x w-min-220px">Docs</div>
                </Link> */}
                <Link href="/settings/" className="flex-center py-2 clickble  px-2 bg-w-hov-10  ">
                    <div className=" pr-3  Q_lg_x"></div>
                    <div className="px-1 tx-center tx-lg opaci-hov--50"><BsGear /></div>
                    <div className="flex-1 pl-1 Q_lg_x w-min-220px">Settings</div>
                </Link>
            </div>
            {<>
                <hr className="w-90 opaci-50 mt-3" style={{borderColor: "white"}} />
                {/* <div className='pa-3 w-100'><SPLoginBtn><AppClientDesc /></SPLoginBtn></div> */}
            </>}
        </div>


    </>)
}