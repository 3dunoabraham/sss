import FlexTable from "@/dom/cell/form/FlexTable"

function Component ({}) {
    return (
        <div>
            <FlexTable theArray={[{id:533324716,name:"3dportworld"}]}
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