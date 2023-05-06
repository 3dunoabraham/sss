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

export default async function Page() {

  const theArray = await fetchUnits({cache: "no-store"})  
  const session:any = await fetchSession() 

  const personal_token = process.env.GITHUB_PERSONAL_TOKEN
  
  return (<>
    <ScreenContainer  badgeClass="" />

    <main className='flex-col pos-rel  ' >
      <div className='h-min-100vh pos-rel w-100 '>
        <div className=' pos-fix h-100vh box-shadow-2 tx-white' style={{background: "#3E5F58"}} >
          <Sidebar foundUser={session.user} ><>
            {
              <SidebarLinks links={[
                // !!session.can.agreement ?
                // {label:"Agreements", icon:"agreements", iconClass:"tx-lg",url:"/agreements"}
                // :
                // {label:"Add Unit", icon:"unit", iconClass:"tx-lg", url:"/unit/add"},
                {label:"Documentation", icon:"permissions", iconClass:"tx-lg", url:"https://tresd1.gitbook.io/imsfront"},
                // {label:"Users", icon:"users", iconClass:"tx-lg", url:"/users"},
                // {label:"Roles", icon:"roles", iconClass:"tx-lg", url:"/roles"},
                // {label:"Actions", icon:"actions", iconClass:"tx-lg", url:"/actions"},
              ]} />
            }
            {/* <div>
              <FilterSidebar />
            </div> */}
            </>
          </Sidebar>
        </div>
        <div className=' flex   '>
          <SidebarFill />
          <div className='px-2 ma-2 bord-r-50' style={{background:"linear-gradient(0deg, #ff9900, #0099ff)"}}>
            
          </div>
          <div className='flex-1 flex-col  flex-align-star flex-align-stretch px-8 Q_xs_px-2 pt-8 '>
                {/* <UserSettings /> */}
                <div className='flex flex-justify-start flex-align-center gap-2 pb-8'>
                  <div className='tx-lg'>Data mutability: </div>
                  <div className='flex gap-2'>
                    <div className='px-2 py-1 bord-r-8 tx-white' style={{background:"#0099ff"}}>Hardcoded</div>
                    <div className='px-2 py-1 bord-r-8 tx-white' style={{background:"#ff9900"}}>Live</div>
                  </div>
                  
                </div>

                {/* <br className='my-8 ' /> */}






                <h1 className='tx-bold'>Layer 1: Owned Data </h1> <br className='mb-8 ' />


                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{background:"#0099FF"}}></div>
                  <h2 className='tx-bold-3'>1.1 Handwritten by Developer </h2>
                </div>
                <h6 style={{color:"#0099FF"}}> available from server </h6>
                <h6> doesn&apos;t need to be imported, queried, fetched or retrieved </h6>
                <h6> this is manually mutable data </h6>
                <hr  className='mb-4' />
                <div className='flex-col flex-align-stretch'>
                  <HardcodedHtmlTable />
                </div>

                <br className='my-8 ' />

                
                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{background:"#2099DF"}}></div>
                  <h2 className='tx-bold-3'>1.2 File-based Database </h2>
                </div>
                <h6 style={{color:"#2099DF"}}> available from server </h6>
                <h6> imported from file (.env, json, csv, ...) </h6>
                <h6> this is mutable data via server code </h6>
                <hr  className='mb-4' />
                <HardcodedJsonTable theJson={REPOS_JSON} />

                <br className='my-8 ' />

                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{background:"#4199BE"}}></div>
                  <h2 className='tx-bold-3'>1.3 Database Schema Connection </h2>
                </div>
                <h6 style={{color:"#4199BE"}}> available from server </h6>
                <h6> queried from connected database </h6>
                <h6> this is mutable data via queries </h6>
                <hr  className='mb-4' />
                {/* @ts-expect-error */}
                <DatabaseConnectedTable />






                <br className='my-100 ' />
                <h1 className='tx-bold'>Layer 2: Fetched Data </h1> <br className='mb-8 ' />

                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{background:"#70998F"}}></div>
                  <h2 className='tx-bold-3'>2.1 Stored in Cache </h2>
                </div>
                <h6 style={{color:"#4199BE"}}> available from server </h6>
                <h6> fetched from 3rd party server, cached on re-enter </h6>
                <h6> this is mutable data via endpoint request </h6>
                <hr  className='mb-4' />
                <div>
                {/* @ts-expect-error */}
                  <ApiFetchedFromServerCached />
                </div>


                <br className='my-8 ' />

                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{background:"#70998F"}}></div>
                  <h2 className='tx-bold-3'>2.2 Fetched from 3rd Party Endpoint </h2>
                </div>
                <h6 style={{color:"#70998F"}}> available from server </h6>
                <h6> fetched from 3rd party server, always updated on re-enter </h6>
                <h6> this is mutable data via endpoint request </h6>
                <hr  className='mb-4' />
                <div>
                {/* @ts-expect-error */}
                  <ApiFetchedFromServer />
                </div>
                {/* {JSON.stringify(REPOS_JSON.map(x=>x.name))} */}

                <br className='my-8 ' />


                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{background:"#A3995C"}}></div>
                  <h2 className='tx-bold-3'>2.3 Saved in Browser </h2>
                </div>
                <h6 style={{color:"#A3995C"}}> available from client </h6>
                <h6> retrieved from browser&apos;s local storage </h6>
                <h6 className='tx-red-50'> this is mutable data by the user </h6>
                <h6 className='tx-green'> defaults to data available from server </h6>
                <hr  className='mb-4' />
                <LocalStorageTable />






                <br className='my-100 ' />
                <h1 className='tx-bold'>Layer 3: User Data </h1> <br className='mb-8 ' />


                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{background:"#B79948"}}></div>
                  <h2 className='tx-bold-3'>3.1. Authorized Local Endpoint </h2>
                </div>
                <h6 style={{color:"#B79948"}}> available from client </h6>
                <h6>fetched from 3rd party server, but calling local endpoint</h6>
                <h6 className='tx-green'>this data and request is authorized</h6>
                <hr  className='mb-4' />
                {/* <h2 className='tx-bold-3'>fetched from client broswer calling local endpoint </h2> */}

                {/* @ ts-expect-error */}
                <FetchLocalEndpoint  />
                {/* <FetchLocalEndpoint qwe="repos2" />
                repos3 */}

                <br className='my-8 ' />


                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{background:"#D4992B"}}></div>
                  <h2 className='tx-bold-3'>3.2. 3rd Party Endpoint Data </h2>
                </div>
                <h6 style={{color:"#D4992B"}}> available from client </h6>
                <h6>fetched from 3rd party endpoint</h6>
                <hr  className='mb-4' />
                <Fetch3rdParty personal_token={personal_token}  />
                {/* <QueryCrud theKey="repos" /> */}

                <hr className="my-8" />

                
                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{background:"#FE9900"}}></div>
                  <h2 className='tx-bold-3'>3.3. Saved in Browser </h2>
                </div>
                <h6 style={{color:"#FE9900"}}> available from client </h6>
                <h6>empty list ready to be filled by user</h6>
                <h6 className='tx-green'>this data is reactive and user generated</h6>
                <hr  className='mb-4' />
                <LiveTable  />
            </div>
          </div>
      </div>
      {/* <div className='flex w-100 pb-8'>
        <SidebarFill />
        <StandardFooter />
      </div> */}
    </main>
  </>)
}