import { SalesStatusBadgePlus } from "@/module/unit/SalesStatusBadgePlus"

function Component({ theArray, bools, config, actionCard, actionHeader, calls }: any) {
  return (<>
    <div className='flex-col    w-100 bord-r-t-8    block  border-lgrey  ' >
      <div className={`w-100  block  border-lgrey-b flex pos-rel ${config?.headerClass}`}
        style={{ background: "#F9FAFB" }}
      >
        {!bools?.includes("isHeadless") &&
          <div className="h-100 w-100 flex">
            <div className=' z-10 flex-1 w-30 flex-col flex-align-start block px-2  flex-1'>
              {config?.idKeyTitle || "id"}
            </div>

            <div className="flex w-70 ">
              {config?.childrenArray && config?.childrenArray.map((aChildren: any, index: number) => {
                return (
                  <div key={index} className={` flex-col flex-align-start  px-2  w-25  ${aChildren.class}`}>
                    {aChildren.title}
                  </div>
                )
              })}
            </div>
            {bools?.includes("isActionable") &&
              <div className=' invisible noclick'>
                {actionHeader}
              </div>
            }
          </div>
        }
      </div>
      {!!theArray && !!theArray.map && theArray.map((anObj: any) => (
        <div key={anObj[config?.idKey || "id"]}
          className=' w-100  block  border-lgrey-b flex pos-rel bg-b-2-odd '
        >
          {!!anObj[config?.linkKey] && bools?.includes("isRowLink") &&
            <div className="top-0 left-0 h-100 w-100 pos-abs flex">
              <a href={"https://" + anObj[config?.linkKey]} target="_blank" rel="noopener noreferrer"

                className='opaci-chov-75 z-10  block   border-lgrey-b flex bg-b-40  opaci-10 flex-1'
              ></a>
              {bools?.includes("isActionable") &&
                <div className=' invisible noclick'>
                  <a href={anObj[config?.linkAlt]} className=" py-3 opaci-chov--50 tx-lg pb-3 px-2 block">...</a>
                </div>
              }
            </div>
          }
          {bools?.includes("isRowSelectable") &&
            <div className="top-0 left-0 h-100 w-100 pos-abs flex " onClick={() => { calls.selectRow(anObj[config?.idKey || "id"]) }}>
              <div className='opaci-chov-75 z-10  block   border-lgrey-b flex bg-b-10  opaci-10 flex-1 '></div>
              {bools?.includes("isActionable") &&
                <div className=' invisible noclick'>
                  <a href={anObj[config?.linkAlt]} className=" py-3 opaci-chov--50 tx-lg pb-3 px-2 block">...</a>
                </div>
              }
            </div>
          }
          <div className='  flex-1 px-2 pos-rel pt-2 w-30'>
            {!!anObj[config?.mainKey] && <>
              {anObj[config?.mainKey]}
            </>}
            {!anObj[config?.mainKey] && !bools?.includes("isDetailed") && <>
              -
            </>}
            {!anObj[config?.mainKey] && bools?.includes("isDetailed") && <>
              <details>
                <summary className='opaci-chov--50 opaci-75  tx-italic'>{config?.mainAltText}</summary>
                <div className="flex-col pa-2   ">
                  {config?.detailsArray && config?.detailsArray.map((aDetail: any, index: number) => {
                    return (
                      <div key={index} className="w-100">
                        <div className={`   ${aDetail.class}`}>
                          <span className="tx-sm">{aDetail.key}</span>:
                          <div>{anObj[aDetail.key]}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </details>
            </>}
          </div>
          <div className="flex w-70  ">
            {config?.childrenArray && config?.childrenArray.map((aChildren: any, index: number) => {
              if (!aChildren.widget) {
                return (
                  <div key={index} className={` flex-col flex-align-start px-2   w-25 ${aChildren.class}`}>
                    {anObj[aChildren.key]}
                  </div>
                )
              }
              return (
                aChildren.widget == "badge" && (
                  <div key={index} className={`flex-col flex-align-start  w-25 ${aChildren.class}`}>

                    <SalesStatusBadgePlus
                      value={anObj[aChildren.key]}
                      reference={[""]}
                    />
                  </div>
                )
              )
            })}
          </div>
          {bools?.includes("isActionable") && !!actionCard && <>
            {/* <div className=' z-1'>
                        <a href={anObj[config?.linkAlt]} 
                            className="nodeco py-3 opaci-chov--50 tx-lg pb-3 px-2 block">...</a>
                    </div> */}
            {actionCard(anObj[config?.idKey || "id"])}
          </>}
        </div>
      ))}
    </div>
  </>)
}

export default Component