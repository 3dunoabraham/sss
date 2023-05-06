"use client";
import FlexTable from "@/dom/cell/form/FlexTable";
import LocalStorageCRUD from "@/dom/organ/crud/LocalStorageCRUD";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts"

function Component ({}) {
    const DEFAULT_DB = {}
    const [crud,s__crud]:any = useState(DEFAULT_DB)
    const [LS_crud, s__LS_crud] = useLocalStorage('crud', JSON.stringify(DEFAULT_DB) )
    
    useEffect(()=>{
        s__crud(JSON.parse(LS_crud)) 
    },[])
    const setLocalStorage = () => {
        let newObj = {repos:[{id:533324716,name:"3dportworld"}]}
        s__crud(newObj)
        s__LS_crud(JSON.stringify(newObj))
    }
    
    return (
        <div>
            <div>
                <button className="ims-button-primary"
                    onClick={setLocalStorage}>
                    Set Local Storage
                </button>
            </div>
            <FlexTable theArray={crud?.repos || []}
                config={{idKey:"id",mainKey:"id",
                    childrenArray: [
                        { key: "name", title: "Name"}
                    ]
                }}
            />
        </div>
    )
}
export default Component