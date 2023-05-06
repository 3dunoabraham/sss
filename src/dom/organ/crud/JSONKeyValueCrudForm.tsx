import { forwardRef, useContext, useImperativeHandle, useState,  } from 'react'


import { AppContext } from '@/../script/state/context/AppContext';
import { fetchDelete, fetchPost, fetchPut } from '@/../script/util/helper';

const Component = forwardRef(({masterKeyName, theUrl, queriedArray, backup = [],
    keyProperty="label"}:any, ref)=>{
    const app:any = useContext(AppContext)    
    const DEFAULT_ITEM = {[keyProperty]:"",id:"", colName:"", colValue:""}
    const [form, s__form] = useState(DEFAULT_ITEM)
    const createItem = (e:any)=>{
        addNewItem(form[keyProperty])
        s__form(DEFAULT_ITEM)
        // q__queriedObj.refetch()
        e.preventDefault()
    }
    const updateItem = async (e:any)=>{
        await updateData(form.id, form[keyProperty])
        s__form(DEFAULT_ITEM)
        // q__queriedObj.refetch()
    }
    async function updateData(id:any,valName:any,val="") {
        let theData = {
            keyName:masterKeyName,
            id: parseInt(id),
            [keyProperty]: valName,
            value: val, 
        }
        // if (val != "") theData.val = 
        const response:any = await fetchPut(theUrl, theData)
        if (response) {
            const updatedItem = await response.json();
            console.log(updatedItem);
        }
        // q__queriedObj.refetch()
    }
    const handleChange = (e:any,subProp:any)=>{
        s__form({...form,...{[subProp]:e.currentTarget.value}})
    }
    const deleteUnit = async ()=>{
        let id = form.id
        await deleteItem(id)
        // q__queriedObj.refetch()
    }
    async function addNewItem(valName:any) {
        const response = fetchPost(theUrl, {keyName:masterKeyName,[keyProperty]: valName,})
        if (!response) { return app.alert("error", "Error") }
        app.alert("success", "Item successfully added to JSON file")
    }
    async function deleteItem(id:any) {
        const response = await fetchDelete(theUrl, {keyName:masterKeyName,id: parseInt(id),})
        if (!response) { throw new Error('Failed to delete item'); }
    }    
    async function deleteAll() {
        const response = await fetchDelete(theUrl,{keyName:masterKeyName,})
    }
    async function importFromBackup() {
        if (backup == undefined) return app.alert("error", "Backup Undefined")
        for (let index = 0; index < backup.length; index++) {
            const item = backup[index];
            await addNewItem(item[keyProperty])
        }
    }      
    async function createCol(e:any) {
        let theSelectedItem = queriedArray.filter((x:any,index:any)=>{ return x.id == form.id })
        if (theSelectedItem.length == 0) { return }
        let selectedItem = !theSelectedItem[0].colVal ? "" : theSelectedItem[0].colVal
        // let selectedItem = !theSelectedItem[0].colVal ? "{}" : theSelectedItem[0].colVal
        // let oldColVal = JSON.parse(selectedItem)
        let oldColVal = selectedItem
        console.log(form.id, theSelectedItem[0][keyProperty], form.colValue)
        await updateData(form.id, theSelectedItem[0][keyProperty], form.colValue)
        e.preventDefault()
    }    
    useImperativeHandle(ref, ()=>({
        form, s__form,
    }));
    


    return (<>
        <div className="flex-center gap-2 flex-1">
            <div className="flex-wrap gap-1">
                <button onClick={createItem} className="ims-button-primary clickble mx-2 mr-8">Add Item</button>
                <form onSubmit={createItem}>
                    <input placeholder='Item Slug' className='ims-button-faded' value={form[keyProperty]}
                        onChange={(e:any)=>handleChange(e,keyProperty)}  
                    />
                </form> 
            </div>
            {!!queriedArray &&
                <div className="flex-wrap gap-1">
                    <form onSubmit={updateItem}>
                        <input placeholder='ID' className='ims-button-faded w-80px' value={form.id}
                            onChange={(e:any)=>handleChange(e,"id")} 
                        />
                    </form> 
                    <button onClick={updateItem} className="ims-button-primary clickble ">Update {form.id}</button>
                    <button onClick={()=>{deleteUnit()}} className="ims-button-primary clickble opaci-75  ">Delete {form.id}</button>
                </div>
            }
        </div>
        {keyProperty == "key" &&
            <div className="flex-col gap-1  w-100">
                <button onClick={createCol} className="ims-button-primary opaci-75 nowrap clickble w-100 ">Update metadata</button>
                {/* <div className="flex-center gap-1  ">
                    <button onClick={createCol} className="ims-button-primary nowrap clickble  ">Add col</button>
                    <button onClick={createCol} className="ims-button-primary nowrap clickble  ">Update col</button>
                </div>         */}
                <form onSubmit={createCol} className="flex gap-1">
                    {/* <input placeholder='Column Name' className='ims-button-faded w-150px' value={form.colName}
                        onChange={(e:any)=>handleChange(e,"colName")} 
                    /> */}
                    <input placeholder='Value' className='ims-button-faded w-100px' value={form.colValue}
                        onChange={(e:any)=>handleChange(e,"colValue")} 
                    />
                </form> 
            </div> 
        }
        <div className="flex-col gap-1 ">
            {!!queriedArray &&
                <button onClick={()=>{deleteAll()}} className="ims-button-primary clickble opaci-75  ">Clear All</button>
            }
            {backup.length > 0 &&
            <button onClick={()=>{importFromBackup()}} className="ims-button-primary  clickble   "
                style={{filter:"hue-rotate(180deg)"}}
            >
                Backup
            </button>
            }
        </div>
    </>);
});
Component.displayName = 'StandardCrud'
export default Component