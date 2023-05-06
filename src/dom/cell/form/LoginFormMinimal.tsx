"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/../script/state/context/AuthContext";


const Component = ({
}: { }) => {
  const $email:any = useRef()
  const [ forms, s__forms ]:any = useState({
    email:"",
    password:"",
    isForm: false,
  })
  const { user, do:{login, demo}, jwt }:any = useAuth()
  const triggerDemo = async () => {
    let res = await demo()
  }
  const triggerLogin = async () => {
    let res = await login(forms)
  }
  const triggerIsForm = async () => {
    s__forms({...forms,...{isForm: true}})
  }
  useEffect(()=>{
    if (!$email.current) return
    $email.current.focus()
  },[forms.isForm])

  return (<>
    <div className='flex-col '>
        
        <button className='py-2 px-7 x  opaci-50 noborder opaci-chov--75 mb-3 box-shadow-2-b z-100'
            onClick={triggerDemo}
          >
            Demo ⇨ 
          </button>

        {forms.isForm &&
          <div className='flex-col gap-3 box-shadow-1-t pa-2 bord-r- mt-8 z-100'>
            <input value={forms.email} onChange={(e:any)=>s__forms({...forms,...{email:e.target.value}})}
              type="text" placeholder='Email'  ref={$email}
              className='bord-r- noborder opaci-50 opaci-hov-75  py-1 px-2  bg-trans'
            />
            <input value={forms.password} onChange={(e:any)=>s__forms({...forms,...{password:e.target.value}})}
              type="password" placeholder='Password' 
              className='bord-r- noborder opaci-50 opaci-hov-75  py-1 px-2  bg-trans'
            />
          </div>
        }
        
        <div className="flex-col   ">
          <a className='py-2 px-6 x  opaci-75 opaci-chov--50 mt-3 noborder bg-trans tx-blue z-100'
            style={{filter:"hue-rotate(-42deg)"}}
            onClick={forms.isForm ? triggerLogin : triggerIsForm}
          >
            <div className="tx-bold-2  ">Register</div>  
          </a>
          {/* <span className="pt-6 tx-ls-2 opaci-25 pr-8 tx-bold-2 ">or</span> */}

          <button className='py-1 px-7   tx-white opaci-75 opaci-chov--50 mt-3 noborder bord-r-5 z-100'
            onClick={forms.isForm ? triggerLogin : triggerIsForm}
          >
            Login
          </button>
        </div>
      </div>
  </>);
};

export default Component;