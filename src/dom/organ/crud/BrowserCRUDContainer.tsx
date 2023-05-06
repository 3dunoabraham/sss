import { useContext, useRef, useState } from "react"
import { useIsClient } from "usehooks-ts"


import _FOREIGNS_JSON from '@/../script/constant/json/foreigns.json'
import { AppContext } from "@/../script/state/context/AppContext"
import ItemsTable from "@/dom/cell/table/ItemsTable"
import BrowserCRUDButtons from "@/dom/organ/crud/BrowserCRUDButtons"
const FOREIGNS_JSON:any = _FOREIGNS_JSON
export default function Component ({ browserArrayList,  queriedObj, s__crud, clearClientCrud,
    clearNewItems, crud, s__LS_crud, hardCoded1, keyName, keyProperty="label",
}:any) {
    const updateQueriedToClient = () => { s__crud({[keyName]: queriedObj[keyName]}) }
    const saveNewItemsToBrowserClient = async ()=>{ s__crud({[keyName]:[...crud[keyName],...newBrowserArray]}); clearNewItems()}
    const clearLocalhostCrud = () => { s__LS_crud(JSON.stringify({[keyName]: []})) }
    const [newBrowserArray, s__newBrowserArray]:any = useState([])
    const app:any = useContext(AppContext)
    const updateJSONToClient = () => { s__crud({[keyName]: FOREIGNS_JSON[keyName]}) }
    const tableConfigObj = {
        key:{title:"id",name:"id",isInvisible: false,},
        rest:{
            col1:{title:"Prop",fieldName:keyProperty},
        },
    }
    let defaultBrowserItem = ()=> ({id:"",[keyProperty]:"test-"+(""+Math.random()).substring(2,6)}) 
    const [browserForm, s__browserForm] = useState(defaultBrowserItem())
    const $browserCrudRef:any = useRef()
    const isClient = useIsClient()
    
    const newItemHandler = (newItem:any)=>{
        s__browserForm(defaultBrowserItem())
        s__newBrowserArray([...$browserCrudRef.current.newList])
    }
    return (<>
    
    <div className="flex Q_xs_flex-col flex-align-stretch gap-3 flex-1">
        <div className="flex-col flex-align-self-start gap-1 flex-align-stretch gap-1">
            <div className="ma-1">
                <BrowserCRUDButtons ref={$browserCrudRef} form={browserForm} s__form={s__browserForm} newItemHandler={newItemHandler} />
            </div>
            {isClient && <>
                <div className="flex-col Q_xs_flex-row gap-1 flex-align-start">
                    <div className="bg-b-50 tx-center opaci-chov--50 pa-2 bord-r-8 tx-white" onClick={()=>{updateQueriedToClient()}}>
                        Queried to Browser
                    </div>
                    <div className="bg-b-50 tx-center opaci-chov--50 pa-2 bord-r-8 tx-white" onClick={()=>{updateJSONToClient()}}>
                        JSON to Browser
                    </div>
                </div>
            </>}
            {isClient && browserArrayList.length > 0 && <>
                <div className="flex gap-1">
                    <button className="tx-center bg-b-50 px-2 py-1 opaci-75 opaci-chov--50 px-1 bord-r-8 tx-white"
                        onClick={()=>{clearClientCrud()}}
                    >
                        Clear <br/> Browser
                    </button>
                    <button className="tx-center bg-b-50 px-2 py-1 opaci-75 opaci-chov--50 px-1 bord-r-8 tx-white"
                        onClick={()=>{clearLocalhostCrud()}}
                    >
                        Clear <br/> Local Storage
                    </button>
                </div>
            </>}
        </div>
        <div className=" flex-1">
            {browserArrayList.length > 0 &&
                <ItemsTable  displayConfigObj={tableConfigObj} boolConfig={[]}
                    headerStyle={{background:app.THEME.primaryColor,color:app.THEME.textColorLight}}
                    theArray={browserArrayList} urlBase="/user/"  
                />
            }
            {newBrowserArray.length > 0 && <>
                <div className="flex-center py-2 gap-2">
                    <button className="tx-center bg-b-50 px-2 py-1 opaci-75 opaci-chov--50 px-1 bord-r-8 tx-white"
                        onClick={()=>{clearNewItems()}}
                    >
                        Clear <br/> New Items
                    </button>
                    {keyName in hardCoded1 &&
                        <div className="bg-b-50 tx-center opaci-chov--50 pa-2 bord-r-8 tx-white" onClick={()=>{saveNewItemsToBrowserClient()}}>
                            Add New Items <br/> to Client Browser
                        </div>
                    }
                    <div className="pt-6 tx-bold-3 opaci-50 tx-sm w-max-300px"> Unsaved Changes *</div>
                </div> 
                <ItemsTable  displayConfigObj={tableConfigObj} boolConfig={[]}
                    theArray={newBrowserArray} urlBase="/user/"  
                />
            </>}
        </div>
    </div>    
    </>)
}