"use client";

import { useEffect, useState } from "react";
import ReposService from '@/../script/state/service/Repos'
import { fetchUnitForeigns } from "../../../script/state/repository/inventory/fetchHelper";
import { fetchRepos } from "../../../script/state/repository/repos";
import FlexTable from "@/dom/cell/form/FlexTable";


function Component({ personal_token }:any) {
    const [theArray, s__theArray] = useState()
    // const theArray = await ReposService.getRepos()
    // console.log("client theArray", theArray)
    // console.log("key asd", )
    // useEffect(()=>{
    //     console.log("key asd", )
    // },[])
    // const asd = "qwe"
    useEffect(() => {
        console.log("creating function getForeigns", )     
        async function getForeigns() {
          const q__foreigns = await fetchRepos("abrahamduno",{
            headers: {Authorization: `Token ${personal_token}`,}
        })
          console.log("q__foreigns", q__foreigns)     
          s__theArray(q__foreigns)
        }
        console.log("running  function getForeigns", )     

        getForeigns()
      }, []);

    return (
        <div>
            {/* {JSON.stringify(theArray)} */}
            
            <FlexTable theArray={theArray}
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