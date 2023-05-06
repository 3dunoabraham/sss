"use client"


import SalesStatusBadge from '@/module/unit/SalesStatusBadge';
import { validateStringLength, validateInteger } from '@/../script/util/helper/validationHelper'
import { InputText } from '@/dom/atom/inputs/InputText'
// ReactFunctionComponent
function Component ({
    unit,
    // updateNewData,
}: any) {
    const updateNewData_Year = (newDataObj:any)=>{
        // updateNewData({...newDataObj, value: validateInteger(newDataObj.value,1950,1950,2050)})
    }
    const updateNewData = () => {

    }

    return (
    <div className="flex-wrap gap-2 ims-tx-faded  tx-md ">
        <div className="flex-center">
            <div className="tx-bold-6 pr-1">Sales Status:</div>
            <SalesStatusBadge value={parseInt(unit.sales_status)} reference={[""]} />
        </div>
        <div className="flex"><div className="tx-bold-6 pr-1">Unit ID:</div>{unit.uid}</div>
        <div className="flex-center w-300px">
            <div className="tx-bold-6 pr-1">VIN:</div>
            <InputText inputName={"vin"} reference={unit.vin || ""} updateNewData={updateNewData} 
                parseFunction={(newVal:any,prevVal:any)=>(validateStringLength(newVal,prevVal,17))}
            />
        </div>
        <div className="flex-center w-150px">
            <div className="tx-bold-6 pr-1">Year:</div>
            <InputText inputName={"year"} reference={unit.year || ""}
                updateNewData={updateNewData_Year}
                parseFunction={(newVal:any,prevVal:any)=>(validateInteger(newVal,prevVal,0,2050))}
            />
        </div>
        <div className="flex">
            <span className="tx-bold-8">Work Order:</span>
            {!!unit.workorder && 
                <a className="ims-tx-link opaci-hov--50 pl-0 pa-1 tx-bold-5 mr-3 pl-2 "
                    href={`${unit.workorder.invoice_url}`}
                >
                    {unit.workorder.invoice_title}
                </a>
            }       
            {!unit.workorder && <div className='px-1'> --- </div>}       
        </div>
    </div>
    )
}

export default Component