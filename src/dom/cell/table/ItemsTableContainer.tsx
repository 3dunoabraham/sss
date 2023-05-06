import { useContext, useMemo, useState } from "react"
import { useIsClient, useLocalStorage } from "usehooks-ts"


import { AppContext } from "@/../script/state/context/AppContext"
import ItemsTable from "@/dom/cell/table/ItemsTable"
import ItemsTablePagination from "@/dom/cell/table/ItemsTablePagination"
import ExportItemsCSV from "@/dom/cell/table/ExportItemsCSV"
import InputItemsPPage from "@/dom/atom/inputs/InputItemsPP"

export default function Component({items, exportConfig, tableConfigObj, urlBase, actionCard,
    selectedItems=[],
    boolConfig,updateSelectedArray=(id:any)=>{} }:any) {
    const app:any = useContext(AppContext)
    const isClient = useIsClient()
    const [LS_itemsPerPage, s__LS_itemsPerPage] = useLocalStorage('itemsPerPage', 25)
    const [itemsPerPage,s__itemsPerPage] = useState<number>(LS_itemsPerPage)
    const [currentPage,s__currentPage] = useState(0)
    const itemsOffsetStart = useMemo(()=>(currentPage * itemsPerPage),[currentPage, itemsPerPage])
    const [selectedId,s__selectedId] = useState(-1)
    const lastPage = useMemo(()=>{
        if (items.length < itemsPerPage) return 0
        return parseInt(`${Math.ceil((items.length / itemsPerPage) - 1)}`) 
    } ,[items, itemsPerPage])
    const paginatedItems = useMemo(()=>{
        let thePaginatedItems = items.slice(itemsOffsetStart,itemsOffsetStart+itemsPerPage)
        return thePaginatedItems // .sort(sortIDDesc)
    },[items,itemsOffsetStart,itemsPerPage])

    const _updateSelectedArray = (id:any)=> {
        console.log("id items table container", id)
        updateSelectedArray(id)
    }

    return (<>
        <ItemsTable 
            displayConfigObj={tableConfigObj}
            {...{s__selectedId,selectedId, urlBase}}
            theArray={paginatedItems} 
            actionCard={actionCard}
            boolConfig={boolConfig}
            updateSelectedArray={_updateSelectedArray}
            selectedItems={selectedItems}
        />
        <ItemsTablePagination {...{currentPage,s__currentPage, lastPage}} />
        {isClient && <>
            <InputItemsPPage up__Value={s__itemsPerPage} />
            <div className="flex flex-justify-end mt-2 ">
                <ExportItemsCSV itemsArray={items} columnLookup={exportConfig.columns}
                    filename={exportConfig.filename} 
                />
            </div>
        </>}
    </>)
}