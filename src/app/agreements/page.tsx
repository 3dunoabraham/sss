import { fetchSession } from '@/../script/state/repository/session';
import Sidebar from '@/dom/organ/layout/Sidebar';
import SidebarLinks from '@/dom/organ/layout/SidebarLinks';
import ScreenContainer from '@/dom/atom/common/ScreenContainer';
import StandardFooter from '@/dom/organ/layout/StandardFooter';
import BreadCrumbs from '@/dom/atom/common/BreadCrumbs';
import SidebarFill from '@/dom/organ/layout/SidebarFill';
import AgreementsTable from '@/module/portal/AgreementsTable';
import { fetchAgreements } from '@/../script/state/repository/agreement';

export default async function Page() {
  const session:any = await fetchSession() 
  const theArray = await fetchAgreements({
    cache: "no-store",headers:{Authorization: 'Bearer ' + session.jwt,}
  })  
  
  return (<>
    <ScreenContainer  badgeClass="" />

    <main className='flex-col pos-rel ddg ' >
      <div className='h-min-100vh pos-rel w-100 '>
        <div className=' pos-fix h-100vh box-shadow-2 tx-white' style={{background: "#3E5F58"}} >
          <Sidebar foundUser={session.user} ><>
            <SidebarLinks links={[
              {label:"Inventory", icon:"inventory", iconClass:"tx-lg",url:"/inventory"},
              {label:"Add Unit", icon:"unit", iconClass:"tx-lg", url:"/unit/add"},
              !!session.can.agreement ?
                {label:"Agreements", icon:"agreements", iconClass:"tx-lg",url:"/agreements"}
                :
                {label:"Roles", icon:"unit", iconClass:"tx-lg", url:"/roles"},  
              {label:"Users", icon:"users", iconClass:"tx-lg", url:"/users"},
            ]} />
            </>
          </Sidebar>
        </div>
        <div className=' flex   '>
          <SidebarFill />
          <div className='flex-1 flex-col  flex-align-start px-8 Q_xs_px-2 pt-'>
              <BreadCrumbs pages={[["/agreements","Agreements"]]} />

              <div > <h1 className='tx-bold-3 mt-6'>Agreements</h1> </div>
              <hr className='opaci-10 w-100 mb-4 my-2' />
              <AgreementsTable initialArray={theArray} q_foreigns={null} />
              
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