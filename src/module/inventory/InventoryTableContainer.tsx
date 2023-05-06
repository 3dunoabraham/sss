import { useContext, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";


import { AppContext } from "@/../script/state/context/AppContext";
import ItemsTableContainer from '@/dom/cell/table/ItemsTableContainer'
import { DEFAULT_UNIT_FOREIGNS, fetchUnitForeigns, parsedFetchedUnit }
from "../../../script/state/repository/inventory/fetchHelper";
import { fetchDelete }
from "@/../script/util/helper";
import { sortIDDesc } from "@/../script/util/type/arrayHelper";
// import { SidebarFilterToolbar } from "@/src/items/templates/SidebarFilterToolbar";
import { API_UNITS } from "@/../script/constant/index";
import { SidebarFilterToolbar } from "@/dom/organ/layout/SidebarFilterToolbar";
// import LOCAL_SETTINGS_JSON from '@/../script/constant/json/localSettings.json'

export default function Component({ unitsArray=[], fetchConfig=null, tableConfigObj, exportConfig, selectedItem, s__selectedItem }:any) {
    const app:any = useContext(AppContext)
    const q_foreigns = useQuery({queryKey: ['foreignsData'], queryFn: async () =>
        await fetchUnitForeigns()
    ,})
    const q__foreigns = useMemo(()=>
        (q_foreigns.error || !q_foreigns.data || q_foreigns.isLoading)
            ? DEFAULT_UNIT_FOREIGNS : q_foreigns.data
    ,[q_foreigns])
    const pq__units = useMemo(()=>{
        if (unitsArray.length == 0) return []
        let newUnitsArray= unitsArray.map((aUnit:any, index:any)=> (
            parsedFetchedUnit(aUnit, q__foreigns.orgsArray, q__foreigns.customersArray) 
        ))
        let filteredUnitsArray = newUnitsArray.filter((theUnit:any, index:any) => {
            if (app.filters.sales_status && theUnit.sales_status != app.filters.sales_status.id)
            { return false }
            if (app.filters.dealer && theUnit.dealer != app.filters.dealer.label) { return false }
            return true
        })
        return filteredUnitsArray.sort(sortIDDesc)
    },[unitsArray, q__foreigns, app.filters])
    const deleteUnit = async (id:any)=>{
        let fetchDeleteRes:any = await fetchDelete(API_UNITS, {uids:[id]})
        if (fetchDeleteRes && fetchDeleteRes.status >= 200 && fetchDeleteRes.status < 300)
        {
            app.alert("success","Deleted")
            window.location.reload()
        }
    }
    const deleteUnits = async (ids:any)=>{
        let fetchDeleteRes:any = await fetchDelete(API_UNITS, {uids:ids})
        if (fetchDeleteRes && fetchDeleteRes.status >= 200 && fetchDeleteRes.status < 300)
        {
            app.alert("success","Deleted")
            window.location.reload()
        }
    }
    const [isSelectable, s__isSelectable] = useState(false)
    const _boolConfig = useMemo(()=>{
        if (isSelectable) {
            // return ["isActionable"]
            return ["isActionable","isSelectable"]
        }
        return ["isActionable"]
    },[isSelectable])
    const [selectedUnits, s__selectedUnits]:any = useState([])
    const updateSelectedArray = (id:any)=> {
        console.log("id", id)
        const theIndex = selectedUnits.indexOf(id)
        if (theIndex != -1) {
            s__selectedUnits(selectedUnits.filter((x:any)=>id!=x))
            return
        }
        s__selectedUnits([...selectedUnits,id])
    }

    return (
    <>
        <SidebarFilterToolbar configObj={app.filters} />
        {pq__units.length == 0 && 
            <div className='tx-xl opaci-10 tx-ls-5 pt-100 pb-8 tx-center w-100 tx-center'>
                No Units Found
            </div>
        }
        <div className="flex-center flex-align-center gap-2 ">
            <div onClick={()=>{s__isSelectable(!isSelectable); if (isSelectable) {s__selectedUnits([])}}}
                className={`opaci-chov--50  mb-2 ${isSelectable ? "ims-button-faded" : "ims-button-primary"}`}
            >
                
                {isSelectable ? "Cancel" : "Select Multiple"}
            </div>  
                <div className="flex-center flex-1">
            {isSelectable && <>
                    
                    <div className="flex-col flex-justify-start flex-align-start py-2 flex-1">
                        <div className="tx-bold-6">Selected Units:</div>
                        <div className="flex-wrap gap-1 flex-justify-start">{selectedUnits.map((anItem:any, index:any)=>{
                            return (
                                <div key={index} className="pa-1 bg-b-10 bord-r-8">
                                    {anItem}
                                </div>
                            )
                        })}</div>
                    </div>
                    {selectedUnits.length > 0 &&
                        <div onClick={()=>{ deleteUnits(selectedUnits) }}
                            className="ims-button-faded border-red tx-red opaci-25"
                        >
                            Delete Selected Units
                        </div>
                    }
            </>}
                </div>
        </div>
        {pq__units.length > 0 &&
            <div className="mt-4 mb-150 " >
                <ItemsTableContainer items={pq__units} exportConfig={exportConfig} 
                    updateSelectedArray={updateSelectedArray}
                    selectedItems={selectedUnits}
                    tableConfigObj={tableConfigObj} urlBase="/unit/"
                    boolConfig={_boolConfig}
                    // boolConfig={[]}
                    // actionCard=null
                    actionCard={(id:any)=>(
                        <button className={`ims-button-faded  tx-green block `}
                            onClick={async (evt)=>{
                                console.log("id, evt",id,evt)
                                s__selectedItem(id)
                                // deleteUnit(id)
                            }}
                        >
                            <span className="">Quick Edit</span>
                        </button>
                    )}
                    // actionCard={(id:any)=>(
                    //     <button className={`ims-button-faded  tx-green block `}
                    //         onClick={async (evt)=>{
                    //             console.log("id, evt",id,evt)
                    //             deleteUnit(id)
                    //         }}
                    //     >
                    //         <span className="">Delete Unit</span>
                    //     </button>
                    // )}
                />
            </div>
        }
    </>
    )
}