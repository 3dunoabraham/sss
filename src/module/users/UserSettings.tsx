"use client";
import { useMemo, useRef, useState } from "react"
import settings from '@/../script/constant/json/settings.json'
import BreadCrumbs from "@/dom/atom/common/BreadCrumbs";
import BrowserCRUDContainer from "@/dom/organ/crud/BrowserCRUDContainer";
import { useLocalStorage } from "usehooks-ts";
import SETTINGS_JSON from '@/../script/constant/json/settings.json'
import LocalStorageCRUD from "@/dom/organ/crud/LocalStorageCRUD";
import { fetchDelete } from "../../../script/util/helper";
import JSONKeyValueCrud from "@/dom/organ/crud/JSONKeyValueCrud";


function Page ({}) {
    const settingsJson:Record<string,any> = SETTINGS_JSON
    const $browserCrudRef:any = useRef()
    const keyName = "data"
    // const keyName = "inventory_page_table-config"
    const inventoryTableConfig = useMemo(() => {
        return keyName in settings ? settings[keyName] : null
    }, [keyName, settings])
    const [isConfigEdit, s__isConfigEdit] = useState(true)
    let hardCodedJson:any = {
        api: { id:1, key: "api", title: "API Settings", plural: "Settings", },
        foreigns: { id:2, key: "foreigns", title: "Foreigns Settings", plural: "Settings", },
        data: { id:3, key: "data", title: "data Settings", plural: "Settings", },
    }
    let hardCoded1:any = Object.keys(hardCodedJson).reduce((acc, key) => {
        return {...acc,...{
            [key]: {
                ...hardCodedJson[key],
                baseUrl: '/api/settings',
                apiUrl: "",
            },
        }};
    }, {});
    const DEFAULT_DB = {[keyName]:[]}
    const [LS_crud, s__LS_crud] = useLocalStorage('crud', JSON.stringify(DEFAULT_DB) )
    const isArrayInJson = keyName in JSON.parse(LS_crud)
    const [crud,s__crud] = useState(DEFAULT_DB)
    const browserArrayList = useMemo(()=>{
        return crud[keyName] || []
    },[crud[keyName],keyName])
    const [newBrowserArray, s__newBrowserArray] = useState([])

    const updateQueriedToLocalstorage = () => { s__LS_crud(JSON.stringify({[keyName]: SETTINGS_JSON[keyName]})) }
    const clearNewItems = () => { $browserCrudRef.current.clearNewItems(); s__newBrowserArray([]) }
    const clearClientCrud = async ()=>{ s__crud(DEFAULT_DB) }
    const updateClientToLocalstorage = () => { s__LS_crud(JSON.stringify({...JSON.parse(LS_crud),...crud})) }
    const theJsonArray = JSON.parse(LS_crud)[keyName]
    const hardCodedMemo:any = useMemo(()=>{
        console.log("keyName in hardCoded1", keyName in hardCoded1)
        return keyName in hardCoded1 ? hardCoded1 : {...hardCoded1,...{[keyName]:{
            baseUrl: '/api/settings',
            apiUrl: "",
        }}}
    },[keyName])
    const deleteUnit = async (e:any)=>{  await deleteItem(e); }
    async function deleteItem(id:any) {
        const response = await fetchDelete(hardCodedMemo[keyName].baseUrl, {keyName:keyName, id: parseInt(id),})
        if (!response) { throw new Error('Failed to delete item'); }
    }


    
    return (
        <div>
            <BreadCrumbs pages={[["/settings/","Settings"],["/settings/"+keyName,keyName]]}
                current={"hardCodedMemo.title"}
            />


            <h1 className="pt-6 tx-bold-5 flex-1 w-100">
                {hardCoded1[keyName] ? hardCoded1[keyName].title : `${keyName} (not found)`}
            </h1>
            <hr className="my-2"/>        
            <div className="  flex Q_xs_sm_flex-col flex-align-stretch gap-3 mb-3">
                <BrowserCRUDContainer  {...{queriedObj:SETTINGS_JSON, s__crud, browserArrayList, keyName,
                    clearClientCrud, hardCoded1, clearNewItems, crud, s__LS_crud, keyProperty: "key",
                }} />
                {isArrayInJson && theJsonArray.length > 0 &&
                    <LocalStorageCRUD {...{updateQueriedToLocalstorage,
                        updateClientToLocalstorage, theJsonArray}}
                    />
                }
                {!(isArrayInJson && theJsonArray.length > 0) &&
                    <div className="flex-col  flex-align-start flex-align-self-start">
                        <h2 className=" tx-bold-5 flex-1 "> NO Local Storage </h2>
                        <hr className="my-2 w-100"/>
                        <div className='tx-center w-100'>
                            {/* <Image src='/icons/svg/404-error.svg' alt='next' width='100' height='100'/> */}
                        </div>
                        {browserArrayList.length > 0 &&
                            <div className='tx-center w-100 mt-4'>
                                <div className="bg-b-10 tx-center opaci-chov--50 pa-2 bord-r-8"
                                    onClick={()=>{updateClientToLocalstorage()}}
                                >
                                    Save to Local
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
            <div className="flex-center Q_xs_sm_flex-col w-100 gap-4 flex-align-start ">
                <JSONKeyValueCrud keyConfig={hardCodedMemo}
                    {...{ keyName, queriedObj:SETTINGS_JSON, deleteUnit}}
                />
            </div>
        </div>
    )
}

export default Page