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

  const theArray = await fetchUnits({ cache: "no-store" })
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
          <div className='px-2 ma-2 bord-r-50' style={{ background: "linear-gradient(0deg, #ff9900, #0099ff)" }}>

          </div>
          <div className='flex-1 flex-col  flex-1 flex-align-star flex-align-stretch px-8 Q_xs_px-2 pt- '>
            {/* <UserSettings /> */}
            


            <h1 className='tx-bold'>Layer 1: Proprietary Data </h1> <br className='mb-8 ' />



            <details>
              <summary className='opaci-chov--25 flex'>
                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{ background: "#0099FF" }}></div>
                  <h2 className='tx-bold-'><div>1.1</div> <div className='tx-bold-3'>Handwritten by Developer </div></h2>
                </div>
              </summary>
              <div>
                <h6 style={{ color: "#0099FF" }}> available from server </h6>
                <h6 className='tx-md tx-bold-2'> doesn&apos;t need to be imported, queried, fetched or retrieved </h6>
                <h6 className='tx-md tx-bold-2'> this is manually mutable data </h6>
                <hr className='mb-4' />
                <div className='flex-col flex-align-stretch'>
                  <HardcodedHtmlTable />
                </div>
                <br className='my-8 ' />
              </div>
            </details>





            <details>
              <summary className='opaci-chov--25 flex'>
                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{ background: "#2099DF" }}></div>
                  <h2 className='tx-bold-'><div>1.2</div> <div className='tx-bold-3'>File-based Database </div></h2>
                </div>
              </summary>
              <div>

                <h6 style={{ color: "#2099DF" }}> available from server </h6>
                <h6 className='tx-md tx-bold-2'> imported from file (.env, json, csv, ...) </h6>
                <h6 className='tx-md tx-bold-2'> this is mutable data via server code </h6>
                <hr className='mb-4' />
                <HardcodedJsonTable theJson={REPOS_JSON} />

                <br className='my-8 ' />

              </div>
            </details>



            <details>
              <summary className='opaci-chov--25 flex'>

                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{ background: "#4199BE" }}></div>
                  <h2 className='tx-bold-'><div>1.3</div> <div className='tx-bold-3'>Database Schema Connection </div></h2>
                </div>
              </summary>
              <div>

                <h6 style={{ color: "#4199BE" }}> available from server </h6>
                <h6 className='tx-md tx-bold-2'> queried from connected database </h6>
                <h6 className='tx-md tx-bold-2'> this is mutable data via queries </h6>
                <hr className='mb-4' />
                {/* @ts-expect-error */}
                <DatabaseConnectedTable />


                <br className='my-8 ' />

              </div>
            </details>



            <hr className='my-4 ' />



            <h1 className='tx-bold'>Layer 2: Fetched Data </h1> <br className='mb-8 ' />
            <details>
              <summary className='opaci-chov--25 flex'>

                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{ background: "#70998F" }}></div>
                  <h2 className='tx-bold-'><div>2.1</div> <div className='tx-bold-3'>Stored in Cache </div></h2>
                </div>
              </summary>
              <div>

                <h6 style={{ color: "#4199BE" }}> available from server </h6>
                <h6 className='tx-md tx-bold-2'> fetched from 3rd party server, cached on re-enter </h6>
                <h6 className='tx-md tx-bold-2'> this is mutable data via endpoint request </h6>
                <hr className='mb-4' />
                <div>
                  {/* @ts-expect-error */}
                  <ApiFetchedFromServerCached />
                </div>



                <br className='my-8 ' />

              </div>
            </details>



            <details>
              <summary className='opaci-chov--25 flex'>

                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{ background: "#70998F" }}></div>
                  <h2 className='tx-bold-'><div>2.2</div> <div className='tx-bold-3'>Fetched from 3rd Party Endpoint </div></h2>
                </div>
              </summary>
              <div>

                <h6 style={{ color: "#70998F" }}> available from server </h6>
                <h6 className='tx-md tx-bold-2'> fetched from 3rd party server, always updated on re-enter </h6>
                <h6 className='tx-md tx-bold-2'> this is mutable data via endpoint request </h6>
                <hr className='mb-4' />
              <div>
                {/* @ts-expect-error */}
                <ApiFetchedFromServer />
              </div>

              <br className='my-8 ' />

              </div>
            </details>


            <details>
              <summary className='opaci-chov--25 flex'>
                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{ background: "#A3995C" }}></div>
                  <h2 className='tx-bold-'><div>2.3</div> <div className='tx-bold-3'>Saved in Browser </div></h2>
                </div>
              </summary>
              <div>
                <h6 style={{ color: "#A3995C" }}> available from client </h6>
                <h6 className='tx-md tx-bold-2'> retrieved from browser&apos;s local storage </h6>
                <h6 className='tx-red-50'> this is mutable data by the user </h6>
                <h6 className='tx-green'> defaults to data available from server </h6>
                <hr className='mb-4' />
                <LocalStorageTable />

                <br className='my-8 ' />

              </div>
            </details>


            <hr className='my-4 ' />
            {/* <br className='my-100 ' /> */}

            <h1 className='tx-bold'>Layer 3: User Data </h1> <br className='mb-8 ' />


            <details>
              <summary className='opaci-chov--25 flex'>
                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{ background: "#B79948" }}></div>
                  <h2 className='tx-bold-'><div>3.1</div> <div className='tx-bold-3'>Authorized Local Endpoint </div></h2>
                </div>
              </summary>
              <div>
                
                <h6 style={{ color: "#B79948" }}> available from client </h6>
                <h6 className='tx-md tx-bold-2'>fetched from 3rd party server, but calling local endpoint</h6>
                <h6 className='tx-green'>this data and request is authorized</h6>
                <hr className='mb-4' />

                {/* @ ts-expect-error */}
                <FetchLocalEndpoint />

                <br className='my-8 ' />
              </div>
            </details>


            <details>
              <summary className='opaci-chov--25 flex'>
                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{ background: "#D4992B" }}></div>
                  <h2 className='tx-bold-'><div>3.2</div> <div className='tx-bold-3'>3rd Party Endpoint Data </div></h2>
                </div>
              </summary>
              <div>
                <h6 style={{ color: "#D4992B" }}> available from client </h6>
                <h6 className='tx-md tx-bold-2'>fetched from 3rd party endpoint</h6>
                <hr className='mb-4' />
                <Fetch3rdParty personal_token={personal_token} />

                <hr className="my-8" />

              </div>
            </details>

            <details>
              <summary className='opaci-chov--25 flex'>
                
                <div className='flex gap-2 pb-2'>
                  <div className='pa-2 bord-r-50' style={{ background: "#FE9900" }}></div>
                  <h2 className='tx-bold-'><div>3.3</div> <div className='tx-bold-3'>Saved in Browser </div></h2>
                </div>
              </summary>
              <div>
                <h6 style={{ color: "#FE9900" }}> available from client </h6>
                <h6 className='tx-md tx-bold-2'>empty list ready to be filled by user</h6>
                <h6 className='tx-green'>this data is reactive and user generated</h6>
                <hr className='mb-4' />
                <LiveTable />

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