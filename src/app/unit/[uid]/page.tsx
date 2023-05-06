import { fetchUnitPageData } from '@/../script/state/repository/inventory/fetchHelper';
import UnitViewEdit from '@/module/unit/UnitViewEdit';
import StandardFooter from '@/dom/organ/layout/StandardFooter';

export default async function Page({ params, searchParams,}:
{
  params?: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const queriedUID = params?.uid
  const q_foreigns = await fetchUnitPageData()
  
  return (
    <main className='flex-col pos-rel ddg ' >
      <div className='h-min-100vh pos-rel w-100 '>

        <UnitViewEdit id={queriedUID} optMapObj={q_foreigns} />
        
      </div>
      <div className='flex-col w-100'>
        <StandardFooter />
      </div>
    </main>
  )
}
