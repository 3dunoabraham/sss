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

export default async function Page() {
  const theArray = await fetchUnits({cache: "no-store"})  
  const session:any = await fetchSession() 
  
  return (<>
    <ScreenContainer  badgeClass="" />

    <main className='flex-col pos-rel ddg ' >
      <div className='h-min-100vh pos-rel w-100 '>
        <div className=' pos-fix h-100vh box-shadow-2 tx-white' style={{background: "#3E5F58"}} >
          <Sidebar foundUser={session.user} ><>
            {
              <SidebarLinks links={[
                !!session.can.agreement ?
                {label:"Agreements", icon:"agreements", iconClass:"tx-lg",url:"/agreements"}
                :
                {label:"Add Unit", icon:"unit", iconClass:"tx-lg", url:"/unit/add"},
                // {label:"Users", icon:"users", iconClass:"tx-lg", url:"/users"},
              ]} />
            }
            <div>
              <FilterSidebar />
            </div>
            </>
          </Sidebar>
        </div>
        <div className=' flex   '>
          <SidebarFill />
          <div className='flex-1 flex-col  flex-align-start px-8 Q_xs_px-2 pt-'>
              <BreadCrumbs pages={[["/inventory","Inventory"]]} />

              <div > <h1 className='tx-bold-3 mt-6'>Inventory</h1> </div>
              <hr className='opaci-10 w-100 mb-4 my-2' />
              <UnitsTable initialArray={theArray} q_foreigns={null} />
              
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