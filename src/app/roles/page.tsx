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

export default async function Page() {
  const theArray = await fetchUnits({cache: "no-store"})  
  const session:any = await fetchSession() 
  
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
                {label:"Permissions", icon:"permissions", iconClass:"tx-lg", url:"/permissions"},
                {label:"Users", icon:"users", iconClass:"tx-lg", url:"/users"},
                {label:"Roles", icon:"roles", iconClass:"tx-lg", url:"/roles"},
                {label:"Actions", icon:"actions", iconClass:"tx-lg", url:"/actions"},
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
          <div className='flex-1 flex-col  flex-align-star flex-align-stretch px-8 Q_xs_px-2 pt- '>
                <UserSettings />
                {/* <QueryCrud /> */}


              
            </div>
          </div>
      </div>
      <div className='flex w-100'>
        <SidebarFill />
        <StandardFooter />
      </div>
    </main>
  </>)
}