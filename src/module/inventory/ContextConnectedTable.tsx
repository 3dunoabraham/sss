import FlexTable from "@/dom/cell/form/FlexTable"
import { getSupabaseClient } from "../../../script/state/repository/supabaseClient"
import { fetchDB, fetchDemoList } from "../../../script/state/repository/demo"

async function Component ({ initArray }:any) {
    // const supabaseC = getSupabaseClient()
    // const theArray:any = await fetchDemoList(supabaseC)
    console.log("initArray", initArray)



    return (
        <div>
            <FlexTable theArray={initArray}
                config={{idKey:"id",mainKey:"id",
                    childrenArray: [
                        { key: "name", title: "Name"},
                        { key: "title", title: "Title"},
                    ]
                }}
            />
        </div>
    )
}

export default Component