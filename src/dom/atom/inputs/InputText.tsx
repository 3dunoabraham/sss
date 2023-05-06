import { ChangeEvent, useEffect, useState, useRef, useCallback } from 'react'
import { useDebounce, useEffectOnce, useEventListener } from 'usehooks-ts'


// import { dlog } from '@/scripts/helpers/devHelper'
// CORE ReactFunctionComponent
export const InputText = ({
    inputName, reference,
    updateNewData, parseFunction = (x:any,y:any) => x,
    ...props
}:any)=>{
    /****** CREATE ******/
    useEffectOnce(()=>{
        s__theValue(reference)
    })



    /****** DATA ******/
    const $domObj = useRef(null)
    const [theValue, s__theValue] = useState<string>('')
    const [updateCount, s__updateCount] = useState(0)
    const debouncedValue = useDebounce<string>(theValue, 999)



    /****** UPDATE ******/
    const handle_onblur = (e:any)=>{
        const _newValue = e.target.value
        if (_newValue === reference && updateCount == 0) return

        s__theValue(`${e.target.value}`)
        updateNewData({ inputName, value: `${e.target.value}`})
        s__updateCount(updateCount+1)
    }
    const updateValueWithDebounce = useCallback(
        ()=>{
            if (debouncedValue == "") return
            if (theValue === reference && updateCount == 0) return
                
            updateNewData({ inputName, value: debouncedValue})
            s__updateCount(updateCount+1)
        },
    [debouncedValue,reference,theValue,updateCount,inputName,updateNewData],
    );
    useEventListener('blur', handle_onblur, $domObj)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{updateValueWithDebounce() }, [debouncedValue,reference])
    const handleChange = (event: ChangeEvent<HTMLInputElement>)=>{
        s__theValue(parseFunction(event.target.value,theValue))
    }



    /****** HTML ******/
    return (
    <div className="flex-col flex-align-stretch w-100 ">
        <input type="text" value={theValue} onChange={handleChange} ref={$domObj} {...props}
            className="py-2 px-4 w-100 ims-tx-dark ims-border-fade border-lgrey border-lgrey-20 bord-r-5 tx-mdl"
        />
    </div>
    )
}