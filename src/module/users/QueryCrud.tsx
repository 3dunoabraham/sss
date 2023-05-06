"use client";
import Head from 'next/head'
import Image from 'next/image'
import { ReactElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useIsClient, useLocalStorage } from 'usehooks-ts'
import { AppContext } from '@/../script/state/context/AppContext'

import FOREIGNS_JSON from '@/../script/constant/json/data.json'
import SETTINGS_JSON from '@/../script/constant/json/settings.json'
import { useQueryPlus } from '@/../script/util/hook/useHooksHelper'
import { fetchDelete, fetchJsonArray, fetchPost } from '@/../script/util/helper'
import BreadCrumbs from '@/dom/atom/common/BreadCrumbs'
import BrowserCRUDContainer from '@/dom/organ/crud/BrowserCRUDContainer'
import LocalStorageCRUD from '@/dom/organ/crud/LocalStorageCRUD'
import APICrud from '@/dom/organ/crud/APICrud'
import JSONFullCrud from '@/dom/organ/crud/JSONFullCrud'


function Component ({ theKey }:{ theKey:string })  {
    useEffect(()=>{
        console.log("key use effect",theKey)
    },[theKey])
    console.log("key", theKey)
    let theK = theKey || "inventory_statuses"
    /****** CREATE ******/
    const foreigns:any = FOREIGNS_JSON
    const app:any = useContext(AppContext)
    // const inv = useContext(InventoryContext)
    const keyName = theK
    const selecteddd = SETTINGS_JSON.data.filter((anItem, index) => {
        return anItem.key == theK
    })
    let selectedValue = selecteddd.length > 0 ? JSON.parse(selecteddd[0].value) : null
    let qweqwe = SETTINGS_JSON.data.reduce((prev, curr:any, i, acc)=>{
        return {...acc,...{[curr.key]:JSON.parse(curr.value)}}
    },{})
    let hardCodedJson:any = qweqwe
    const DEFAULT_DB = {[keyName]:[]}
    const [LS_crud, s__LS_crud] = useLocalStorage('crud', JSON.stringify(DEFAULT_DB) )
    const [crud,s__crud] = useState(DEFAULT_DB)
    const isClient = useIsClient()
    const $browserCrudRef:any = useRef()
    const [newBrowserArray, s__newBrowserArray] = useState([])
    const theJsonArray = JSON.parse(LS_crud)[keyName]
    const isArrayInJson = keyName in JSON.parse(LS_crud)
    let hardCoded1 = Object.keys(hardCodedJson).reduce((acc:any, key) => {
        acc[key] = {
            ...hardCodedJson[key],
            baseUrl: '/api/crud',
            apiUrl: keyName in hardCodedJson
                ? `${hardCodedJson[keyName].url}`
                : "",
        };
        return acc;
    }, {});
    const [q__queriedObj, queriedObj] = useQueryPlus({ queryKey: ['unitData'], retry: 1,
        refetchOnWindowFocus: false,
        queryFn: async () =>{
            return FOREIGNS_JSON
        }
    },{[keyName]:[]})
    const [q__queriedAPI, queriedAPI] = useQueryPlus({ queryKey: ['apiData'], retry: 1,
        refetchOnWindowFocus: false,
        queryFn: async () =>{
            return hardCodedMemo[keyName].isApiful ? await fetchJsonArray(hardCodedMemo[keyName].apiUrl) : []
        }
    },{[keyName]:[]})



    /****** UPDATE ******/
    async function deleteItem(id:any) {
        const response = await fetchDelete(hardCodedMemo[keyName].baseUrl, {keyName:keyName, id: parseInt(id),})
        if (!response) { throw new Error('Failed to delete item'); }
    }
    const clearClientCrud = async ()=>{ s__crud(DEFAULT_DB) }
    const deleteUnit = async (e:any)=>{  await deleteItem(e); }
    const updateJSONToClient = () => { s__crud({[keyName]: foreigns[keyName]}) }
    const updateQueriedToLocalstorage = () => { s__LS_crud(JSON.stringify({[keyName]: foreigns[keyName]})) }
    const clearNewItems = () => { $browserCrudRef.current.clearNewItems(); s__newBrowserArray([]) }
    const updateClientToLocalstorage = () => { s__LS_crud(JSON.stringify({...JSON.parse(LS_crud),...crud})) }
    const saveAPIListToJson = async ()=> {
        for (let index = 0; index < queriedAPI.length; index++) {
            const item = queriedAPI[index];
            await addNewItem(item.label)
        }
    }
    async function addNewItem(label:any) {
        const response = fetchPost(hardCodedMemo[keyName].baseUrl, {keyName,label: label,})
        if (!response) { return app.alert("error", "Error") }
        app.alert("success", "Item successfully added to JSON file")
    }    



    /****** BEHAVE ******/
    const hardCodedMemo:any = useMemo(()=>{
        console.log("keyName in hardCoded1", keyName in hardCoded1, hardCoded1)
        return keyName in hardCoded1 ? hardCoded1 : {...hardCoded1,...{[keyName]:{
            baseUrl: '/api/crud',
            apiUrl: "",
        }}}
    },[keyName])
    const browserArrayList = useMemo(()=>{ return crud[keyName] || [] },[crud[keyName],keyName])
    useEffect(()=>{
        console.log("use effect key", theKey)
        if (keyName in FOREIGNS_JSON) { s__crud({[keyName]:foreigns[keyName]}) }
        app.s__sidebarLinks(
            Object.keys(foreigns).map((x,i)=>({
                id:i,label:("/foreigns/"+x).toLocaleLowerCase().replace("foreigns", "fg"),src:"/foreigns/"+x
            }))
        )
        
        app.s__sidebarPages([
            {id:0,label:"Inventory",url:"/inventory/",icon:"inventory"},
        ])
    },[FOREIGNS_JSON, keyName]) 
    useEffect(()=>{
        if (hardCodedMemo[keyName].isApiful) {
            q__queriedAPI.refetch()
        }
        s__crud({[keyName]:foreigns[keyName]})
    },[keyName]) 



    /****** HTML ******/
    return (
    <div className='flex-center w-100 h-min-100vh'>
        <Head>
            <title>Foreigns | IMS</title>
            {/* <title>{hardCoded1[keyName] ? hardCoded1[keyName].title : `not found`} | IMS</title> */}
        </Head>
        <div >
            {/* <BreadCrumbs pages={[["/settings/","Settings"],["/foreigns/"+keyName,"Foreigns"]]}
                current={keyName.replace("_"," ").toUpperCase()}
            /> */}


            <h1 className="pt-6 tx-bold-5 flex-1 w-100">
                {hardCoded1[keyName] ? hardCoded1[keyName].title : `${keyName} (not found)`}
            </h1>
            <hr className="my-2"/>        
            <div className="  flex Q_xs_sm_flex-col flex-align-stretch gap-3 mb-3">
                {/* <BrowserCRUDContainer  {...{queriedObj:FOREIGNS_JSON, s__crud, browserArrayList, keyName,
                    clearClientCrud, hardCoded1, clearNewItems, crud, s__LS_crud,
                }} /> */}

                {isClient && isArrayInJson && theJsonArray.length > 0 &&
                    <LocalStorageCRUD {...{updateQueriedToLocalstorage, updateClientToLocalstorage,
                        theJsonArray
                    }}/>
                }
                {isClient && !(isArrayInJson && theJsonArray.length > 0) &&
                    <div className="flex-col  flex-align-start flex-align-self-start">
                        <h2 className=" tx-bold-5 flex-1 "> NO Local Storage </h2>
                        <hr className="my-2 w-100"/>
                        <div className='tx-center w-100'>
                            <Image src='/icons/svg/404-error.svg' alt='next' width='100' height='100'/>
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
            {/* 32
            |{JSON.stringify(keyName)}|
            |{JSON.stringify(hardCoded1)}|
            1 */}
            <div className="flex-center Q_xs_sm_flex-col w-100 gap-4 flex-align-start ">
                {((keyName in hardCoded1 && !hardCoded1[keyName].isApiful) || !(keyName in hardCoded1)) &&
                    <div className="flex-col  flex-align-start ">
                        <h2 className=" tx-bold-5 flex-1 "> NO API Endpoint</h2>
                        <hr className="my-2 w-100"/>
                        <div className='tx-center w-100'>
                            <Image src='/icons/svg/404-error.svg' alt='next' width='100' height='100'/>
                        </div>
                    </div>
                }
    <div className='flex-col'>
                <h1>fetched from client side calling 3rd party server</h1>

                {keyName in hardCoded1 && hardCoded1[keyName].isApiful && <>
                    <APICrud {...{q__queriedObj:()=>{}, queriedObj:FOREIGNS_JSON, q__queriedAPI, queriedAPI,
                        hardCoded1, keyName, saveAPIListToJson
                    }}/>
                </>}                
                </div>
                {/* <JSONFullCrud keyConfig={hardCodedMemo}
                    {...{ keyName, q__queriedObj:()=>{}, queriedObj:FOREIGNS_JSON, deleteUnit}}
                /> */}
            </div>
        </div>
    </div>
    )
}

export default Component