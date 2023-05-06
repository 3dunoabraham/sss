"use client";
import { InputText } from "@/dom/atom/inputs/InputText";
import FlexTable from "@/dom/cell/form/FlexTable"
import { useState } from "react";

function Component ({}) {
    const [form, s__form] = useState({name:""})
    const [theArray, s__theArray]:any = useState([])
    const updateNewData = (e:any) => {
        console.log("e", e)
        s__form({name:e.value})
    }
    const addItem = () => {
        s__theArray([...theArray, {...form, id:theArray.length}])
    }


    return (
        <div className="flex gap-2">
            <div className="flex-col flex-justify-end gap-1">
                <div>
                    <div className="flex-col">Name:</div>
                    <InputText placeholder="John" updateNewData={updateNewData} />
                </div>
                <div>
                    <button className="ims-bg-primary tx-mdl tx-white bord-r-8 opaci-chov--50 px-6 py-1"
                        onClick={addItem}
                    >
                        Add
                    </button>
                </div>
            </div>
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