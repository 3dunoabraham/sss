"use client";
import { useState, useMemo, useRef, useContext } from 'react'
import { useRouter } from 'next/navigation';
import { useMap } from 'usehooks-ts'
import { useEffectOnce } from 'usehooks-ts'
import Head from 'next/head'
import Link from 'next/link'


import { DEFAULT_UNIT, IUnit, DEFAULT_DOC_CATEGORIES } from '@/../script/constant/unit'
import { useUnloadHandler } from '@/../script/util/hook/useHooksHelper';
import { unit2Form } from '@/../script/util/type/unitHelper';
import { API_UNITS } from '@/../script/constant/index';
import { AppContext } from '@/../script/state/context/AppContext';
import { parseChangedDataToAddObj } from '../../../script/state/repository/inventory/fetchHelper';
import { fetchPost } from '@/../script/util/helper';
import { UnitMainForm } from '@/module/unit/MainForm'
import UnitTopForm from '@/module/unit/TopForm'
import { UnitBottomForm } from '@/module/unit/BottomForm'
import { UnitSaveEditButtonLoadings } from '@/module/unit/SaveEditButtonLoadings';
import { SectionPlaceholder } from '@/dom/atom/holders/SectionPlaceholder';
import { UnitSuccessBlock } from '@/module/unit/SuccessBlock';
import { PagePlaceholder } from '@/dom/atom/holders/PagePlaceholder'
import BreadCrumbs from '@/dom/atom/common/BreadCrumbs';
import StandardFooter from '@/dom/organ/layout/StandardFooter';

export interface UnitAddComponentProps {
  unit?: IUnit;
  optMapObj?: any; docsArray?: any; notesArray?: any;logsArray?: any;
  isLoadingRefetching?: any;
  refetch?: (deps?:any) => void;
}
// ReactFunctionComponent
function Component({
  unit,
  optMapObj,docsArray = [], notesArray = [],logsArray = [],
  isLoadingRefetching,
  refetch=(deps=[])=>{},
...others
}: UnitAddComponentProps){
  /****** CREATE ******/
  useEffectOnce(()=>{
    setRefreshCount(refreshCount+1)
    let {uid, ...emptyUnit}:any = DEFAULT_UNIT
    Object.keys(emptyUnit).map((aProperty)=>{
      let anEmptyUnitProp = emptyUnit[aProperty]
      if (["location_related", "model_style","brand","dealer","distributor",
          "manufacturer","owner","sub_manufacturer","location","previous_investor",
          "current_investor",].includes(aProperty)
      ) {
        return
      }
      changedData_do.set(aProperty, anEmptyUnitProp)
    })
    changedData_do.set("label", "")
  })



  /****** DATA ******/
  const [confirmRedirect, s__confirmRedirect] = useState(true);
  const [changedData, changedData_do] = useMap()
  const [notSaved,s__notSaved] = useState(false)
  const [newUID,s__newUID] = useState("")
  const router = useRouter()
  const app:any = useContext(AppContext);
  const $mainDOMObj = useRef(null)
  const [redirectionTimeout, s__redirectionTimeout] = useState(null);
  const [isLoadingEditing, s__isLoadingEditing] = useState<boolean>(false);
  const [succesfulRequest, s__succesfulRequest] = useState<boolean>(true);
  const [refreshCount, setRefreshCount] = useState<number>(0)
  const [loadings, s__loadings] = useState("");
  const fileArrayMap = useMemo(()=>{
    let theMap = new Map()
    DEFAULT_DOC_CATEGORIES.map((aCat, index)=>{ theMap.set(aCat,{}) })
    if (!docsArray){return theMap}
    docsArray.map((aDoc:any, index:any)=>{
      if (!DEFAULT_DOC_CATEGORIES[aDoc.category]) return
      let prevObj: Object = theMap.get(DEFAULT_DOC_CATEGORIES[aDoc.category])
      let newObj = {...prevObj,...{[aDoc.id]: {id: aDoc.id,file_name: `${aDoc.file_name}`}}}
      theMap.set(DEFAULT_DOC_CATEGORIES[aDoc.category], newObj)
    })
    return theMap
  },[docsArray])
  const blockIfEditing = useMemo(()=>{
    return isLoadingEditing ? "stopcursor" : "Save"
  },[isLoadingEditing])
  const customFormValues = useMemo(()=> (unit2Form(unit)), [unit]);



  /****** UPDATE ******/
  useUnloadHandler(router, notSaved,)
  const handleTopBottomSave = ()=>{
    if (isLoadingEditing) return 

    addUnit()
  }
  const validateNewUnit = ()=>{
    return true
  }
  const addUnit = async ()=>{
    let the_data = parseChangedDataToAddObj(changedData)
    if (!validateNewUnit()) return
    s__loadings("creating")

    let fetchPostRes:any = await fetchPost(API_UNITS, the_data)
    app.alertReset()
    if (fetchPostRes && fetchPostRes.status >= 200 && fetchPostRes.status < 300)
    {
      app.alert("success","Success")
      let addedRes = await fetchPostRes.json()
      s__newUID(addedRes.uid)
      s__loadings("")
      s__notSaved(false)
      // s__redirectionTimeout(setTimeout(()=>{redirectIfTrue(addedRes.uid)},3000))
    } else {
      s__loadings("")
      app.alert("error","Network Error. Failed to save new unit")
    }
  }
  const redirectIfTrue = (_newUID:any)=>{
    if (confirmRedirect) {
      window.location.href = "/unit/"+_newUID;
    }
  }
  const updateNewData = (newDataObj:any)=>{
    s__notSaved(true);
    changedData_do.set(newDataObj.inputName, newDataObj.value)
  }



  /****** HTML ******/
  if (!optMapObj) {
    return (
      <div className={`Q_lg_x_px-8 w-100`}>
        <div className="block px-2">
          <BreadCrumbs pages={[["/inventory","Inventory"]]} current={`Add Unit`} />
          <div className='py-6'><PagePlaceholder /></div>
        </div>
      </div>
    )
  }
  
  return(<>        
    <Head> <title>{`Add Unit | IMS`}</title> </Head>
    {(newUID != "") &&
      <div className=''>
        <div className='pt-2 flex-center '>
          {loadings == "" && <UnitSuccessBlock s__confirmRedirect={s__confirmRedirect}
            redirectionTimeout={redirectionTimeout} s__redirectionTimeout={s__redirectionTimeout}
            confirmRedirect={confirmRedirect}
            newUID={newUID} loadings={loadings}
          />}
        </div>
        <div className="flex-center mt-8 pt-100 w-100">
          <div className="flex-wrap pa-8  w-75 ims-bg-faded bord-r-8 box-shadow-2">
            <div className="ims-button-primary  ">
              <Link  className=" px-2 py-4 tx-" href="/unit/add">
                <div className="tx-ls-1 tx-lgx">+ New Unit </div>
                <p className="mt-1 tx-">Add Unit to Inventory</p>
              </Link>
            </div>
            <Link  className="ims-cardlink box-shadow-3" href="/inventory">
              <h2 className="">Inventory &uarr;</h2><p className="">Unit List</p>
            </Link>
            <Link  className="ims-cardlink box-shadow-3" href="/inventory?stts=1">
              <h2 className="">Store &rarr;</h2><p className="">Available Units</p>
            </Link>
          </div>
        </div>
      </div>
    }
    {!(newUID != "") &&
    <div className={`Q_lg_x_px-8 w-100 px-100 h-100vh Q_xs_sm_px-2 flex-col flex-justify-stretch `}>
      <div className="block px-2">
        <BreadCrumbs pages={[["/inventory","Inventory"]]} current={`Add Unit`} />
        <div className="Q_xs_sm my-2 invisible block">.</div>
        <div className="flex-between Q_xs_md_flex-col">
          {loadings != "" &&
            <div className='tx-lgx mt-200 flex flex-align-end flex-justify-center   flex-1'>
              <div className='ims-badge-faded mx-2 px-2 py-2 '>Loading</div>
              <div className=' px-2 py-2 '>Creating New Unit...</div>
            </div>
          }
        </div>
        {loadings != "creating" && <>
          <div className="flex pt-2 pb-3"> 
            <UnitTopForm {...{unit,updateNewData}} />
          </div>
          <hr/>
        </>}
        <div className="pt-8 mt-3 pos-rel" ref={$mainDOMObj}>
          <div className={`flex  mt-8 pt-8   mr-100  pos-fixed top-0 right-0 z-500 `} >
            <UnitSaveEditButtonLoadings editMode={true} refreshCount={refreshCount}
              isLoadingEditing={isLoadingEditing} isLoadingRefetching={isLoadingRefetching} 
              succesfulRequest={succesfulRequest} blockIfEditing={blockIfEditing} isCancelable={false} 
              cancelEdit={()=>{}} handleTopBottomSave={handleTopBottomSave}
            />
          </div>
          {loadings != "creating" && <>
            <UnitMainForm refetch={refetch} editMode={true}  isAddPage={true} 
              unit={unit} optMapObj={optMapObj} updateNewData={updateNewData}
            />
            <UnitBottomForm unit={unit} optMapObj={optMapObj} values={customFormValues}
              updateNewData={updateNewData} editMode={true} 
            />
          </>}
          {loadings == "creating" && <>
            <SectionPlaceholder/>
          </>}
          <div className='flex flex-justify-end'>
            <UnitSaveEditButtonLoadings  editMode={true}
              isCancelable={false} isLoader={false} isLoadingEditing={isLoadingEditing}
              isLoadingRefetching={isLoadingRefetching} refreshCount={refreshCount}
              cancelEdit={()=>{}} succesfulRequest={succesfulRequest}
              blockIfEditing={blockIfEditing} handleTopBottomSave={handleTopBottomSave}
            />
          </div>
        </div>
      </div>
      <div className='pos-rel w-100 block'>
        <StandardFooter />
        </div>
    </div>
    }
  </>)
}

export default Component