import FlexTable from "@/dom/cell/form/FlexTable"
import { fetchRepos } from "../../../script/state/repository/repos"

async function Component ({}) {
    const theArray = await fetchRepos("abrahamduno", {cache: "no-store"})

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