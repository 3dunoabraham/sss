import UnitAddComponent from '@/module/unit/UnitAddComponent';
import { DEFAULT_UNIT } from '@/../script/constant/unit';
import { fetchUnitPageData } from '../../../../script/state/repository/inventory/fetchHelper';

export default async function Home() {
  const q_foreigns = await fetchUnitPageData()

  return (
    <main className='flex-col pos-rel ddg ' >
      <div className='h-min-100vh pos-rel w-100 '>        
            
        <UnitAddComponent unit={DEFAULT_UNIT} optMapObj={q_foreigns} />
            
      </div>
    </main>
  )
}