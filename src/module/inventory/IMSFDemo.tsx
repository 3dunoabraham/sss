import { fetchSession } from '@/../script/state/repository/session';
import { fetchUnits } from '@/../script/state/repository/inventory/unit';
import Sidebar from '@/dom/organ/layout/Sidebar';
import UnitsTable from '@/module/inventory/UnitsTable';
import SidebarLinks from '@/dom/organ/layout/SidebarLinks';
import ScreenContainer from '@/dom/atom/common/ScreenContainer';
import StandardFooter from '@/dom/organ/layout/StandardFooter';
import BreadCrumbs from '@/dom/atom/common/BreadCrumbs';
import SidebarFill from '@/dom/organ/layout/SidebarFill';
import FilterSidebar from '@/dom/organ/layout/FilterSidebar';
import UserSettings from '@/module/users/UserSettings';
import QueryCrud from '@/module/users/QueryCrud';
import FetchLocalEndpoint from '@/module/users/FetchLocalEndpoint';
import REPOS_JSON from '@/../script/constant/json/repos.json';
import HardcodedHtmlTable from '@/module/landing/HardcodedHtmlTable';
import HardcodedJsonTable from '@/module/landing/HardcodedJsonTable';
import DatabaseConnectedTable from '@/module/landing/DatabaseConnectedTable';
import ApiFetchedFromServer from '@/module/landing/ApiFetchedFromServer';
import LiveTable from '@/module/landing/LiveTable';
import LocalStorageTable from '@/module/landing/LocalStorageTable';
import Fetch3rdParty from '@/module/landing/Fetch3rdParty';
import ApiFetchedFromServerCached from '@/module/landing/ApiFetchedFromServerCached';
import ContextConnectedTable from './ContextConnectedTable';
import { getSupabaseClient } from '../../../script/state/repository/supabaseClient';
import { fetchDemoList } from '../../../script/state/repository/demo';

export default async function Page() {
  const supabaseC = getSupabaseClient()
  const theArray:any = await fetchDemoList(supabaseC)
  const theCodeArray:any = theArray.filter((x:any)=>(x.category == "code"))
  const theArtArray:any = theArray.filter((x:any)=>(x.category == "art"))
  const theGameArray:any = theArray.filter((x:any)=>(x.category == "game"))

  const theLatestArray:any = theArray.filter((x:any)=>(!!x.vip))
  const theStandardsArray:any = theArray.filter((x:any)=>(!!x.techstack))

  // console.log("theArray", theArray)

  // const theArray = await fetchUnits({ cache: "no-store" })
  const session: any = await fetchSession()

  const personal_token = process.env.GITHUB_PERSONAL_TOKEN

  return (<>
    <ScreenContainer badgeClass="" />

    <main className='flex-col pos-rel  ' >
      <div className=' pos-rel w-100 '>
        {/* <div className=' pos-fix h-100vh box-shadow-2 tx-white' style={{background: "#3E5F58"}} >
          <Sidebar foundUser={session.user} ><>
            {
              <SidebarLinks links={[
                {label:"Documentation", icon:"permissions", iconClass:"tx-lg", url:"https://tresd1.gitbook.io/imsfront"},
              ]} />
            }
            </>
          </Sidebar>
        </div> */}
        <div className=' flex   '>
          {/* <SidebarFill /> */}
          {/* <div className='px-2 ma-2 bord-r-50' style={{ background: "linear-gradient(45deg, #ff0000, #0099ff)" }}>

          </div> */}
          <div className='flex-1 flex-col  flex-1 flex-align-star flex-align-stretch px-8 Q_xs_px-2 pt- '>
            {/* <UserSettings /> */}
            


            <h1 className='tx-bold'>Abraham Duno </h1> <br className='mb-8 ' />


            <details>
              <summary className='opaci-chov--25 flex'>

                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{ background: "#ffff00" }}></div>
                  <h2 className='tx-bold-'><div>Latest</div> <div className='tx-bold-3'>Current Projects  </div></h2>
                </div>
              </summary>
              <div>

                {/* <h6 style={{ color: "#4199BE" }}> available from server </h6>
                <h6 className='tx-md tx-bold-2'> fetched from 3rd party server, cached on re-enter </h6>
                <h6 className='tx-md tx-bold-2'> this is mutable data via endpoint request </h6> */}
                <hr className='mb-4' />
                <div>
                  {/* @ts-expect-error */}
                  <ContextConnectedTable initArray={theLatestArray} />
                </div>



                <br className='my-8 ' />

              </div>
            </details>

            <hr className='my-8 ' />


            <details>
              <summary className='opaci-chov--25 flex'>
                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{ background: "#0099FF" }}></div>
                  <h2 className='tx-bold-'><div>Code</div> <div className='tx-bold-3'>Typescript, Threejs, Solidity, ... </div></h2>
                </div>
              </summary>
              <div>
                {/* <h6 style={{ color: "#0099FF" }}> available from server </h6> */}
                {/* <h6 className='tx-md tx-bold-2'> Database Schema Connection </h6> */}
                {/* <h6 className='tx-md tx-bold-2'> this is manually mutable data </h6> */}
                <hr className='mb-4' />
                <div className='flex-col flex-align-stretch'>
                  {/* @ts-expect-error */}
                  <ContextConnectedTable initArray={theCodeArray} />
                  {/* <HardcodedHtmlTable /> */}
                </div>
                <br className='my-8 ' />
              </div>
            </details>

            <br className='my-2 ' />




            <details>
              <summary className='opaci-chov--25 flex'>
                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{ background: "#70998F" }}></div>
                  <h2 className='tx-bold-'><div>Art</div> <div className='tx-bold-3'>Digital Sculptures, Short Films, ... </div></h2>
                </div>
              </summary>
              <div>

                {/* <h6 style={{ color: "#70998F" }}> available from server </h6>
                <h6 className='tx-md tx-bold-2'> imported from file (.env, json, csv, ...) </h6>
                <h6 className='tx-md tx-bold-2'> this is mutable data via server code </h6> */}
                <hr className='mb-4' />
                  {/* @ts-expect-error */}
                  <ContextConnectedTable initArray={theArtArray} />

                <br className='my-8 ' />

              </div>
            </details>

            <br className='my-2 ' />


            <details>
              <summary className='opaci-chov--25 flex'>

                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{ background: "#ff9900" }}></div>
                  <h2 className='tx-bold-'><div>Games</div> <div className='tx-bold-3'>Web-Based, 3D, Blockchain, ... </div></h2>
                </div>
              </summary>
              <div>
{/* 
                <h6 style={{ color: "#ff9900" }}> available from server </h6>
                <h6 className='tx-md tx-bold-2'> queried from connected database </h6>
                <h6 className='tx-md tx-bold-2'> this is mutable data via queries </h6> */}
                <hr className='mb-4' />
                  {/* @ts-expect-error */}
                  <ContextConnectedTable initArray={theGameArray} />


                <br className='my-8 ' />

              </div>
            </details>



            <hr className='my-8 ' />



            <h1 className=' tx-bold-3'>TechStack </h1> <br className='mb-8 ' />



            <details>
              <summary className='opaci-chov--25 flex'>

                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{ background: "#ff00ff" }}></div>
                  <h2 className='tx-bold-'><div>Technologies</div> <div className='tx-bold-3'>Tools, Languages, ... </div></h2>
                </div>
              </summary>
              <div>

                {/* <h6 style={{ color: "#70998F" }}> available from server </h6>
                <h6 className='tx-md tx-bold-2'> fetched from 3rd party server, always updated on re-enter </h6>
                <h6 className='tx-md tx-bold-2'> this is mutable data via endpoint request </h6> */}
                <hr className='mb-4' />
              <div>
                {/* @ts-expect-error */}
                  <ContextConnectedTable initArray={theStandardsArray} />
              </div>

              <br className='my-8 ' />

              </div>
            </details>



          </div>
        </div>
      </div>
      {/* <div className='flex w-100 pb-8'>
      </div> */}
        {/* <SidebarFill /> */}
        {/* <StandardFooter /> */}
    </main>
  </>)
}