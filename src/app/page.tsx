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
import SSSDemo from '@/module/landing/SSSDemo';
import InvFrontCard from '@/module/inventory/InvFrontCard';
import IMSFDemo from '@/module/inventory/IMSFDemo';

export default async function Page() {

  const theArray = await fetchUnits({cache: "no-store"})  
  const session:any = await fetchSession() 

  const personal_token = process.env.GITHUB_PERSONAL_TOKEN
  
  return (<>
    <ScreenContainer  badgeClass="" />

    <main className='flex-col pos-rel  ' style={{
      background:"linear-gradient(0deg,white, #FFfcfa)"
    }} >
      <div className=' pos-rel w-100 Q_xs_px-4 px-8 mt-5'>
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
        <div className='flex'>
        <div className=' w-300px Q_lg_x'></div>
        <div className=' pos-fix w-300px Q_lg_x'>
            
          <InvFrontCard />
        </div>

        <div className='w-100'>
          
        <div className='  Q_xs_lg'>
            
            <InvFrontCard />
            <br className='my-8' />
          </div>
          {/* demo */}
                {/* @ts-expect-error */}
                <IMSFDemo />

          <hr className='my-4' />

        </div>
        </div>
      </div>
      {/* <div className='flex w-100 pb-8'>
        <SidebarFill />
        <div>
          <h1>content</h1>
          <h1>content</h1>
          <h1>content</h1>
          <h1>content</h1>
          <h1>content</h1>
          <h1>content</h1>
          <h1>content</h1>
          <h1>content</h1>
          <h1>content</h1>
          <h1>content</h1>
          <h1>content</h1>
        </div>
        <StandardFooter />
      </div> */}
    </main>
  </>)
}