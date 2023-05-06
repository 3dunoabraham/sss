import { useEffect, useMemo, useRef, useState } from "react"
import { useIsClient, useLocalStorage } from "usehooks-ts"


import SETTINGS_JSON from '@/../script/constant/json/settings.json'
import { fetchPut } from "@/../script/util/helper"
import { objectEquals } from "@/../script/util/helper/validationHelper"

export default function Component ({keyName }:any) {
    const [form, s__form] = useState<any>()
    const $jsonCrudForm:any = useRef()
    const DEFAULT_DB = {[keyName]:[]}
    const [LS_crud, s__LS_crud] = useLocalStorage('settings', JSON.stringify(DEFAULT_DB) )
    const settings:Record<string,any> = SETTINGS_JSON
    const theJsonArray = JSON.parse(LS_crud)[keyName]
    const [selectedItemIndex, s__selectedItemIndex] = useState(-1)
    const isClient = useIsClient()
    const nestedTableConfigObj = {
        key:{title:"id",name:"id",isInvisible: false,},
        rest:{
            col1:{title:"Key",fieldName:"key"},
            col2:{title:"Title",fieldName:"title"},
        },
    }
    const updateSelectedColName = (colName:any) => {
        $jsonCrudForm.current.s__form({...$jsonCrudForm.current.form,...{colName: colName}})
    }
    const updateSelectedArray = (id:any) => {
        let foundItemArray = settings[keyName].findIndex((x:any,i:any) => {return x.id == id})
        s__selectedItemIndex(foundItemArray)
        if (!$jsonCrudForm.current) return
        $jsonCrudForm.current.s__form({...$jsonCrudForm.current.form,...{id: id}})        
    }
    const handleChange = (e:any,subProp:any)=>{
        s__form({...form,...{[subProp]:e.currentTarget.value}})
    }
    async function createCol(e:any) {
        if (!form["title-"+"new"] || !form["fieldName-"+"new"]) return
        let theSelectedItem = settings[keyName][1]
        let oldColVal = JSON.parse(theSelectedItem.colVal)
        await updateData(2, "rest", JSON.stringify( {...oldColVal,...{
            [form["fieldName-"+"new"]]:JSON.stringify(
                { title:form["title-"+"new"],fieldName:form["fieldName-"+"new"] ,widget:form["widget-"+"new"]}
            )
        }} ))
        e.preventDefault()
    }
    async function delCol(id:any) {
        let theSelectedItem = settings[keyName][1]
        let oldColVal = JSON.parse(theSelectedItem.colVal)
        let newColVal = {...oldColVal}
        delete newColVal[id]
        await updateData(2, "rest", JSON.stringify( newColVal ))
    }
    async function updateData(id:any,key:any,val="") {
        const response:any = await fetchPut("/api/settings/", {
            keyName:keyName,
            id: parseInt(id),
            key: key,
            colVal: val,
        })
        if (response) {
            const updatedItem = await response.json();
            console.log(updatedItem);
        }
    }
    useEffect(()=>{
        let cols = JSON.parse(settings[keyName][1].colVal)
        let colsKeys = Object.keys(cols)
        let asd:any = {
            "fieldName-new": "",
            "title-new": "",
            "widget-new": "",
        }
        colsKeys.map((aCol,index)=>{
            let aColConfig = JSON.parse(cols[aCol])
            asd["fieldName-"+index] = aColConfig.fieldName
            asd["title-"+index] = aColConfig.title
            asd["widget-"+index] = aColConfig.widget || ""
        })
        s__form(asd)
    },[])
    const shouldRenderMetadataSection = useMemo(() => {
        return isClient && keyName in settings
    }, [isClient, keyName, settings])

    const shouldRenderCancelEditButton = useMemo(() => {
        return keyName in settings && selectedItemIndex > -1
    }, [keyName, settings, selectedItemIndex])

    const shouldRenderAddColumnButton = useMemo(() => {
        return shouldRenderCancelEditButton && !!settings[keyName][selectedItemIndex].colVal
    }, [keyName, settings, selectedItemIndex])

    const shouldRenderEditColumnsButton = useMemo(() => {
        return !(shouldRenderCancelEditButton)
    }, [keyName, settings, selectedItemIndex])

    const selectedColumns = useMemo(() => {
        return shouldRenderAddColumnButton
            ? Object.keys(JSON.parse(settings[keyName][selectedItemIndex].colVal))
            : []
    }, [keyName, settings, selectedItemIndex])
      


    return (<>
    <div className="flex  g ">
        {shouldRenderMetadataSection && <>
            <div className="w-100 ">
                <div className={` flex Q_xs_md_flex-col flex-align-start gap-3`}>
                    <div className="flex flex-align-end gap-1">
                        <div className="flex tx-bold-5">ID_Title:</div>
                        <div className="flex tx-lg tx-bold-2">{JSON.stringify(JSON.parse(settings[keyName][0].colVal).title)}</div>
                    </div>
                    <div className="flex flex-align-end gap-1">
                        <div className="flex tx-bold-5">Identifier_Name:</div>
                        <div className="flex tx-lg tx-bold-2">{JSON.stringify(JSON.parse(settings[keyName][0].colVal).name)}</div>
                    </div>
                    <div className="flex-1">
                    </div>
                    <div className="flex-1"></div>
                    {shouldRenderAddColumnButton && <>
                        <div className=" flex gap-1 r ">
                            <button className="flex opaci-chov--50 ims-button-primary" onClick={(e:any)=>{ createCol(e) }}>Add Column</button>
                            <div className="pa-1 bg-b-20 bord-r-8 flex-col ">
                                <div className="flex-center " >
                                    {form && "title-"+"new" in form && <>
                                        t:
                                        <input type="text" placeholder="Title" className="pa-1 w-80px tx-xsm noborder bord-r-8 ma-1"
                                            value={form["title-"+"new"]} onChange={(e:any)=>{handleChange(e,"title-"+"new")}} 
                                        />
                                    </>}
                                    {form && "fieldName-"+"new" in form && <>
                                        f:
                                        <input type="text" placeholder="Field Name" className="pa-1 w-80px tx-xsm noborder bord-r-8 ma-1"
                                            value={form["fieldName-"+"new"]} onChange={(e:any)=>{handleChange(e,"fieldName-"+"new")}} 
                                        />
                                    </>}
                                    {form && "widget-"+"new" in form && <>
                                        w:
                                        <input type="text" placeholder="Widget" className="pa-1 w-80px tx-xsm noborder bord-r-8 ma-1"
                                            value={form["widget-"+"new"]} onChange={(e:any)=>{handleChange(e,"widget-"+"new")}} 
                                        />
                                    </>}
                                </div>
                            </div>
                        </div>
                    </>}
                    {shouldRenderEditColumnsButton &&
                        <button className="flex gap-1 ims-button-primary opaci-chov--50 px-2 py-1 bord-r-8 "
                            onClick={(id:any)=>{ updateSelectedArray(2) }}
                        >
                            <span className="flex">Edit Columns</span>
                        </button>
                    }
                    {shouldRenderCancelEditButton &&
                        <button className="flex gap-1 border-lgrey opaci-chov--50 px-2 py-1 bord-r-8  "
                            onClick={(id:any)=>{ updateSelectedArray(-1) }}
                        >
                            <span className="flex">Cancel Edit</span>
                        </button>
                    }
                </div>
            </div>
        </>}
    </div>
    <div className="flex-col flex-align-start  gap-1 b">
        {shouldRenderAddColumnButton && <>
            <div className="flex-wrap flex-align-start gap-1 r ">
                {selectedColumns.map((anItem:any, index:any) => {
                    return (
                        <div className="pa-1 bg-b-20 bord-r-8 flex-col " key={index}>
                            <div className="flex w-100" >
                                <div className="flex-1 flex flex-align-end gap-1 opaci-chov--50 pa-1" onClick={()=>{updateSelectedColName(anItem)}}>
                                    <div className="tx-sm opaci-50">Col:</div>
                                    {anItem}
                                </div>
                                <div className="opaci-chov--25 pa-1"
                                    onClick={()=>{ delCol(anItem) }}
                                >
                                    x
                                </div>
                            </div>
                            <div className="flex-center " >
                                {form && "title-"+index in form && <>
                                    <span className="opaci-50">t</span>:
                                    <input type="text" value={form["title-"+index]}
                                        onChange={(e:any)=>{handleChange(e,"title-"+index)}}
                                        className="pa-1 w-80px tx-xsm noborder bord-r-8 ma-1"
                                    />
                                </>}
                                {form && "fieldName-"+index in form &&  <>
                                    <span className="opaci-50">f</span>:
                                    <input type="text"  value={form["fieldName-"+index]}
                                        className="pa-1 w-80px tx-xsm noborder bord-r-8 ma-1"
                                        onChange={(e:any)=>{handleChange(e,"fieldName-"+index)}}
                                    />
                                </>}
                            </div>
                            <div className="flex-center opaci-chov-50 opaci-50 " >
                                {form && "widget-"+index in form &&  <>
                                    w:
                                    <input type="text" className="pa-1 w-80px tx-xs noborder bord-r-8 ma-1" 
                                        onChange={(e:any)=>{handleChange(e,"widget-"+index)}} value={form["widget-"+index]}
                                    />
                                </>}                                        
                                {   objectEquals([
                                        {title:form["title-"+index],fieldName:form["fieldName-"+index],widget:form["widget-"+index]} ,
                                        JSON.parse(JSON.parse(settings[keyName][1].colVal)[anItem])]
                                    )
                                    ? ""
                                    : (
                                        <button className="ims-bg-primary tx-white px-2 py-1 bord-r-8"
                                            onClick={async ()=>{ 
                                                let oldColVal = JSON.parse(settings[keyName][1].colVal)
                                                await updateData(2, "rest",
                                                    JSON.stringify({...oldColVal,...{
                                                        [anItem]: JSON.stringify({
                                                            title:form["title-"+index],fieldName:form["fieldName-"+index],widget:form["widget-"+index]
                                                        })
                                                    }} )
                                                )
                                            }}
                                        >
                                            update
                                        </button>
                                    )
                                }      
                            </div>                              
                        </div>
                    )
                })}
            </div>
        </>}
    </div>
    </>)
}

