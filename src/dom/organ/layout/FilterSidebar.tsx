"use client";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useMemo } from "react";
import { BsChevronUp, BsCircle } from "react-icons/bs";
import { useRouter } from "next/router";


import { DEFAULT_UNIT_FOREIGNS, fetchUnitForeigns } from "../../../../script/state/repository/inventory/fetchHelper";
import { AppContext } from "@/../script/state/context/AppContext";
import { InventoryContext } from "@/../script/state/context/InventoryContext";
import { FAKE_UNIT_FOREIGNS } from "@/../script/constant";
import SidebarHeader from "@/dom/organ/layout/SidebarHeader";
import { SidebarFilterSection } from "@/dom/organ/layout/SidebarFilterSection";

function Component({ online=true }) {
    // const { query } = useRouter()
    const inv = useContext(InventoryContext)
    const app:any = useContext(AppContext)
    const INVENTORY_FILTERS_OBJ = {
        sales_status:{
            filter: {title: "Sales Status",optField: "label", optName:"sales_status", fieldName:"label"},
            optsArray: [],
        },
        dealer:{
            filter: {title: "Dealer",optField: "name", optName:"dealer", fieldName:"name"},
            optsArray: [],
        }
    }
    const q_foreigns:any = useQuery({queryKey: ['statusesData'], queryFn: async () =>
        app.online ? await fetchUnitForeigns() : FAKE_UNIT_FOREIGNS
    ,})
    const q__foreigns = useMemo(()=> (
        q_foreigns.error || !q_foreigns.data || q_foreigns.isLoading) ? DEFAULT_UNIT_FOREIGNS : q_foreigns.data
    ,[q_foreigns])







    // const filtersObj = useMemo(()=>{
    //     // return INVENTORY_FILTERS_OBJ
    //     // if (inv.unitsArray.length == 0) return INVENTORY_FILTERS_OBJ
    //     let filtersObj = {...INVENTORY_FILTERS_OBJ}
    //     filtersObj["sales_status"].optsArray = q__foreigns.sales_statuses
    //     if (inv.unitsArray.length > 0) {
    //         // console.log("inv.unitsArray.length", inv.unitsArray.length)
    //         filtersObj["sales_status"].optsArray = filtersObj["sales_status"].optsArray.map((anItem:any, index:any)=>{
    //             let theCount = inv.unitsArray.filter((theUnit,i)=> theUnit.sales_status == anItem.id  )
    //             return {...anItem, ...{ _COUNT: theCount.length }}
    //         })
    //     }
    //     filtersObj["dealer"].optsArray = q__foreigns.dealers
    //     if (inv.unitsArray.length > 0) {
    //         filtersObj["dealer"].optsArray = filtersObj["dealer"].optsArray.map((anItem:any, index:any)=>{
    //             let theCount = inv.unitsArray.filter((theUnit,i)=> theUnit.dealer == anItem.name  )
    //             return {...anItem, ...{ _COUNT: theCount.length }}
    //         })
    //     }
    //     return filtersObj
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[q__foreigns, inv.unitsArray])




    

    const filtersObj = useMemo(() => {
        const lookupTable:any = {
            sales_status: {
                optsArray: q__foreigns.sales_statuses,
                arrayPropertyKeyName: 'sales_statuses',
                filterByProperty: 'sales_status',
                keyFieldName: "id",
            },
            dealer: {
                optsArray: q__foreigns.dealers,
                arrayPropertyKeyName: 'dealers',
                filterByProperty: 'dealer',
                keyFieldName: "name",
            },
        };
      
        const filtersObj:any = { ...INVENTORY_FILTERS_OBJ };
      
        Object.keys(lookupTable).forEach((key) => {
          const { optsArray, arrayPropertyKeyName, filterByProperty, keyFieldName } = lookupTable[key];
          filtersObj[key].optsArray = q__foreigns[arrayPropertyKeyName];
          if (inv.unitsArray.length > 0) {
            filtersObj[key].optsArray = optsArray.map((anItem:any, index:any) => {
              const theCount = inv.unitsArray.filter((theUnit, i) => theUnit[filterByProperty] === anItem[keyFieldName]);
              return { ...anItem, ...{ _COUNT: theCount.length } };
            });
          }
        });
      
        return filtersObj;
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [q__foreigns, inv.unitsArray]);


    useEffect(()=>{
        let freshFilters:any = {}
        let sales_status = app.query.stts
        if (sales_status && q__foreigns.sales_statuses) {
            let theLabel = q__foreigns.sales_statuses.filter((anItem:any, index:any)=>{
                return anItem.id == sales_status
            })
            if (theLabel.length > 0)
            {
                freshFilters["sales_status"] = {
                    on: true, id: sales_status, label: theLabel[0].label, title: "Sales Status"
                }
            }
        }
        app.s__filters(freshFilters)
    },[q__foreigns])

    const handleFilterClick = (data:any)=> {
        let newFiltersObj = {...app.filters,...{
            [data.optName]: { on: true, id: data.id, label: data.label, title: data.title}
        }}
        if (data.optName in app.filters && app.filters[data.optName].id == data.id)
        {
            delete newFiltersObj[data.optName]
        }
        app.s__filters(newFiltersObj)
    }

    return (<>
    {/* <div>qwe</div> */}
    {/* <div className="flex-center py-4 clickble  px-4 bg-w-hov-10  invisible Q_lg_x">
        <div className=" pr-3 invisible  Q_lg_x"><BsCircle /></div>
        <div className="px-1 tx-center tx-lg opaci-hov--50"></div>
        <div className="flex-1 pl-3 Q_lg_x w-min-200px"></div>
        <div className=" tx-center   tx-mdl Q_lg_x" ><BsChevronUp /></div>
    </div>
    <div className="pos-fix top-0  flex-col Q_lg_x">
        <SidebarHeader /> */}
        <div className='flex-1 w-100'>
            {!q_foreigns.data && 
                <div className="pl-8 pt-6 opaci-50 w-300px Q_lg_x">Loading Filters...</div>
            }
            {!!q_foreigns.data && Object.keys(filtersObj).map((aFilterSection, index)=>{
                return (
                    <div key={index}> 
                        <SidebarFilterSection filterSection={filtersObj[aFilterSection]} theIcon={<BsCircle />}
                            handleClick={handleFilterClick}
                        />
                    </div>
                )
            })}
        </div>
    {/* </div> */}
    </>)
}

export default Component