import { fetchSession } from '@/../script/state/repository/session';
import Sidebar from '@/dom/organ/layout/Sidebar';
import SidebarLinks from '@/dom/organ/layout/SidebarLinks';
import ScreenContainer from '@/dom/atom/common/ScreenContainer';
import StandardFooter from '@/dom/organ/layout/StandardFooter';
import BreadCrumbs from '@/dom/atom/common/BreadCrumbs';
import SidebarFill from '@/dom/organ/layout/SidebarFill';
import AgreementsTable from '@/module/portal/AgreementsTable';
import { fetchAgreements } from '@/../script/state/repository/agreement';
import { Suspense } from 'react';
import BoxContainer from '@/3d/BoxContainer';

export default async function Page({ params, searchParams,}:any) {
  const session:any = await fetchSession() 
  const queriedUID = params?.uid
//   const theArray = await fetchAgreements({
//     cache: "no-store",headers:{Authorization: 'Bearer ' + session.jwt,}
//   })  
  
  return (<>
    <ScreenContainer  badgeClass="" />

    <main className='flex-col pos-rel ddg ' >
      <div className='h-min-100vh pos-rel w-100 '>
        <div className=' pos-fix h-100vh box-shadow-2 tx-white' style={{background: "#3E5F58"}} >
          <Sidebar foundUser={session.user} ><>
            <SidebarLinks links={[
              {label:"Inventory", icon:"inventory", iconClass:"tx-lg",url:"/inventory"},
              
              !!session?.can?.agreement ?
                {label:"Agreements", icon:"agreements", iconClass:"tx-lg",url:"/agreements"}
                :
                {label:"Add Unit", icon:"unit", iconClass:"tx-lg", url:"/unit/add"},  
              {label:"Permissions", icon:"users", iconClass:"tx-lg", url:"/permissions"},
            ]} />
            </>
          </Sidebar>
        </div>
        <div className=' flex   '>
          <SidebarFill />
          <div className='flex-1 flex-col  flex-align-start px-8 Q_xs_px-2 pt-'>
              <BreadCrumbs pages={[["/builder/3d","3D Builder"]]}  current={`${queriedUID}`} />

              <div > <h1 className='tx-bold-3 mt-6'>3D Builder</h1> </div>
              <hr className='opaci-10 w-100 mb-4 my-2' />
              {/* <AgreementsTable initialArray={theArray} q_foreigns={null} /> */}
              

              <Suspense>
                    <div className="flex-1 h-max-700px pos-rel  w-95  flex" id="root">
                        <BoxContainer />
                        {/* {selectedItemIndex >= 0 &&
                            <div className="pos-abs top-0 right-0 pa-1 box-shadow-i-1-bl bord-r-8 flex-col">
                                <Link className="tx-ls-1 opaci-75" target={"_blank"} 
                                    href={`/unit/${unitsArray[selectedItemIndex][matchestableConfigObj.key.name]}`}
                                >
                                    #{unitsArray[selectedItemIndex][matchestableConfigObj.key.name]}
                                </Link>
                                <div className="flex-col pa-1 ma-1 bord-r-8 bg-b-10 box-shadow-3 bord-r-8">
                                    <FeetInchesLabel size={unitsArray[selectedItemIndex].size} />
                                </div>
                            </div>
                        } */}
                    </div>          
                </Suspense>

                
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