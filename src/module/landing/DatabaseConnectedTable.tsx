import FlexTable from "@/dom/cell/form/FlexTable"
import { getSupabaseClient } from "../../../script/state/repository/supabaseClient"
import { fetchDB, fetchDemoList } from "../../../script/state/repository/demo"

async function Component ({ }:any) {
    const supabaseC = getSupabaseClient()
    const theArray:any = await fetchDemoList(supabaseC)
    console.log("theArray", theArray)

    return (
        <div>
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