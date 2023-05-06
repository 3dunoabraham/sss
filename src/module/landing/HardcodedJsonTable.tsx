import FlexTable from "@/dom/cell/form/FlexTable"

function Component ({theJson}:any) {
    return (
        <div>
            <FlexTable theArray={theJson}
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