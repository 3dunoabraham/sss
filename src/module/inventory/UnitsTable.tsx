"use client";
import Link from "next/link";
import { useMemo, useContext, useEffect, useState } from "react";


import FlexTable from "@/dom/cell/form/FlexTable"
import { fetchUnitForeigns, parsedFetchedUnit } from "../../../script/state/repository/inventory/fetchHelper";
import { AppContext } from "@/../script/state/context/AppContext";
import Dropdown from "@/dom/atom/common/Dropdown";
import { InventoryContext } from "@/../script/state/context/InventoryContext";
import { SidebarFilterToolbar } from "@/dom/organ/layout/SidebarFilterToolbar";
import ItemsTablePagination from "@/dom/cell/table/ItemsTablePagination";
import { useLocalStorage } from "usehooks-ts";
import InputItemsPP from "@/dom/atom/inputs/InputItemsPP";

function Component ({ initialArray, q_foreigns }:any) {

  const [q__f, s__q__f] = useState<any>()
  const [loading, s__loading] = useState<any>()
  const inv = useContext(InventoryContext)
  const app:any = useContext(AppContext);
  useEffect(() => {
    async function getForeigns() {
      const q__foreigns = await fetchUnitForeigns()
      // console.log("q__foreigns", q__foreigns)     
      s__q__f(q__foreigns)
    }
    getForeigns()
    inv.s__unitsArray(initialArray)
  }, []);

  const pq__units = useMemo(()=>{
    if (initialArray.length == 0) return []
    if ((!q__f || !q__f.orgsArray) || (!q__f || !q__f.customersArray)) {
      return initialArray.map((anUnit:any) => {
        return { ...anUnit,
          urlToGo: "/unit/"+anUnit.uid,
          location: "loading...",
          dealer: "loading...",
          manuf: "",
          label_uid: "#"+anUnit.uid,
        }
      })
    }
    let newUnitsArray= initialArray.map((aUnit:any, index:number)=> (
      parsedFetchedUnit(aUnit, q__f.orgsArray, q__f.customersArray) 
    ))
    let filteredUnitsArray = newUnitsArray.filter((theUnit:any, index:any) => {
      if (app.filters.sales_status && theUnit.sales_status != app.filters.sales_status.id) { return false }
      if (app.filters.dealer && theUnit.dealer != app.filters.dealer.label) { return false }
      return true
    })
    return filteredUnitsArray // .sort(sortIDDesc)
  },[initialArray, q_foreigns, app.filters, q__f])

  const theArray = useMemo(() => {
    return pq__units.map((anUnit:any) => {
      return { ...anUnit,
        urlToGo: "/unit/"+anUnit.uid,
          manuf: anUnit.manufacturer,
          label_uid: "#"+anUnit.uid,
        }
      }
    )
  },[pq__units])
  const buttonActionText = "..."
  const buttonActionClass = "tx-lg pb-3 pt-1 px-2 tx-gray opaci-chov--25"
  const [LS_itemsPerPage, s__LS_itemsPerPage] = useLocalStorage('itemsPerPage', 25)
  const [itemsPerPage,s__itemsPerPage] = useState<number>(LS_itemsPerPage)
  const lastPage = useMemo(()=>{
    if (theArray.length < itemsPerPage) return 0
    return parseInt(`${Math.ceil((theArray.length / itemsPerPage) - 1)}`) 
} ,[theArray, itemsPerPage])
  const [currentPage,s__currentPage] = useState(0)
  const itemsOffsetStart = useMemo(()=>(currentPage * itemsPerPage),[currentPage, itemsPerPage])
  const paginatedItems = useMemo(()=>{
      let thePaginatedItems = theArray.slice(itemsOffsetStart,itemsOffsetStart+itemsPerPage)
      return thePaginatedItems // .sort(sortIDDesc)
  },[theArray,itemsOffsetStart,itemsPerPage])
  const actionCard = (id:any) => {
    return (<>
      <Dropdown buttonTitle={buttonActionText} buttonClass={buttonActionClass}>
        <div className="flex-col flex-align-stretch gap-1 bg-white pa-2 bord-r-8 z-100 ">
          <Link  href={`unit/${id}`} className="ims-button-primary clickble nowrap"
            onClick={()=>{s__loading(id)}}
          >
            {id == loading && <div className="spin-1 px-1">-</div>} View Details
          </Link>
          <Link  href={`builder/3d/${id}`} className="ims-button-faded clickble nowrap"
            // onClick={()=>{s__loading(id)}}
          >
            View Model
          </Link>
        </div>
      </Dropdown>
    </>)
  }
  const selectRow = (id:any)  => {
    console.log("id", id)
    return
  }


  return (<>
    <div className="pb-2">
      <SidebarFilterToolbar configObj={app.filters} />
    </div>
    <FlexTable theArray={paginatedItems} bools={["isActionable",/* "isRowSelectable" */]} actionCard={actionCard} 
        actionHeader={<div className={buttonActionClass}>{buttonActionText}</div>}
        calls={{
          selectRow,
        }}
        config={{idKey:"uid",mainKey:"label_uid",
            headerClass:"tx-sm tx-gray tx-bold-3",
            linkAlt:"urlToGo",idKeyTitle:"UID",
            mainAltText:"No Link",
            detailsArray: [
            ],
            childrenArray: [
              { key: "vin", title: "VIN"},
              { key: "sales_status", title: "Status", widget: "badge"},
              { key: "location", title: "Location"},
              { key: "dealer", title: "Dealer"},
            ],
        }}
    />
    <div className="w-100 pb-100">
      <ItemsTablePagination {...{currentPage,s__currentPage, lastPage}} />
      <InputItemsPP up__Value={s__itemsPerPage} />
      
    </div>
  </>)
}

export default Component