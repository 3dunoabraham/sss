"use client";
import Link from "next/link";
import { useMemo, useContext, useEffect, useState } from "react";


import FlexTable from "@/dom/cell/form/FlexTable"
import { fetchUnitForeigns, parsedFetchedUnit } from "../../../script/state/repository/inventory/fetchHelper";
import { AppContext } from "@/../script/state/context/AppContext";
import Dropdown from "@/dom/atom/common/Dropdown";

function Component ({ initialArray, q_foreigns }:any) {
  const [q__f, s__q__f] = useState<any>()
  const [loading, s__loading] = useState<any>()
  const app:any = useContext(AppContext);
  useEffect(() => {
      async function getForeigns() {
          const q__foreigns = await fetchUnitForeigns()
          // console.log("q__foreigns", q__foreigns)     
          s__q__f(q__foreigns)
      }
      getForeigns()
  }, []);

  const pq__units = useMemo(()=>{
    if (initialArray.length == 0) return []
    if ((!q__f || !q__f.orgsArray) || (!q__f || !q__f.customersArray)) {
      return initialArray.map((anUnit:any) => {
        return { ...anUnit,
          urlToGo: "/agreement/"+anUnit.uid,
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
        urlToGo: "/agreement/"+anUnit.uid,
          manuf: anUnit.manufacturer,
          label_uid: "#"+anUnit.uid,
          label_rpa_code: "#"+anUnit.rpa_code,
        }
      }
    )
  },[pq__units])
  const buttonActionText = "..."
  const buttonActionClass = "tx-lg pb-3 pt-1 px-2 tx-gray opaci-chov--25"
  const actionCard = (id:any) => {
    return (<>
      <Dropdown buttonTitle={buttonActionText} buttonClass={buttonActionClass}>
        <div className="flex-col flex-align-stretch gap-1 bg-white pa-2 bord-r-8">
          <Link  href={`agreement/${id}`} className="ims-button-primary clickble nowrap"
            onClick={()=>{s__loading(id)}}
          >
            {id == loading && <div className="spin-1 px-1">-</div>} View Details
          </Link>
        </div>
      </Dropdown>
    </>)
  }



  return (
    <FlexTable theArray={theArray} bools={["isActionable"]} actionCard={actionCard} 
        actionHeader={<div className={buttonActionClass}>{buttonActionText}</div>}
        config={{idKey:"rpa_code",mainKey:"label_rpa_code",
            headerClass:"tx-sm tx-gray tx-bold-3",
            linkAlt:"urlToGo",idKeyTitle:"RPA ID",
            mainAltText:"No Link",
            detailsArray: [
            ],
            childrenArray: [
            //   { key: "vin", title: "VIN"},
            //   { key: "sales_status", title: "Status", widget: "badge"},
            //   { key: "location", title: "Location"},
            //   { key: "dealer", title: "Dealer"},
            ],
        }}
    />
  )
}

export default Component