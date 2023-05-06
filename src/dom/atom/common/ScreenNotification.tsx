import { useState } from "react"

export function ScreenNotification ({
    onHide=()=>{}, delay=4000, badgeClass="ims-badge-faded", alertMsg="",s__msg,
}: any) {
    const [visible, setVisible] = useState(true)

    const hide = ()=>{
        s__msg("")
        setVisible(false)
        onHide()
    }

    // useTimeout(hide, delay)
    
    if (alertMsg == "") return <></>
    return (
        <div className={
                `${visible ? "appear-appear " : ""} appear-hiding pos-fixed top-0 z-999 50 bg-b-50 w-100 h-min-100vh bg-glass-5`
            }
        >
            <div className="flex-col h-min-100vh">
                <div className={` ${badgeClass} px-3 py-2 tx-white tx-shadow-2 flex-col`}>
                    {alertMsg}
                    <div className="flex spin-4   tx-xl  opaci-50">.
                        <div className="spin-3 tx-center opaci-50">. <div className="spin-2 tx-center opaci-50">.</div> </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
