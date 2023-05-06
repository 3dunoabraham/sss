"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { FaDoorClosed } from "react-icons/fa";
import { useRouter } from 'next/navigation';


import { useAuth } from "@/../script/state/context/AuthContext";
import { useBools } from "@/../script/util/hook/useBools";
import { AppContext } from "@/../script/state/context/AppContext";

const Component = ({
}: { }) => {
  const app:any = useContext(AppContext)
  const router = useRouter()
  const $email:any = useRef()
  const [ loadings, t__loadings, s__loading ]:any = useBools({
    login: false
  })
  const [ forms, s__forms ]:any = useState({ email:"", password:"", isForm: false, })
  const { user, do:{login, logout, demo,},  jwt }:any = useAuth()
  useEffect(()=>{
    if (!$email.current) return
    $email.current.focus()
  },[forms.isForm])
  const triggerLogout = async () => {
    app.alert("neutral","Signin out, clearing cookies...")
    let res = await logout()
    window.location.reload()
  }
  return (<>
    <div className='flex-col '>
      {forms.isForm &&
        <div className='flex-col flex-align-stretch gap-3 box-shadow-1-t pa-2 bord-r- mt-8 z-100'>
          <input value={forms.email} type="text" placeholder='Email'  ref={$email}
            onChange={(e:any)=>s__forms({...forms,...{email:e.target.value}})}
            className='bord-r- noborder opaci-50 opaci-hov-75  py-1 px-2 tx-md  bg-trans '
          />
          <input value={forms.password}
            onChange={(e:any)=>s__forms({...forms,...{password:e.target.value}})}
            type="password" placeholder='Password' 
            className='bord-r- noborder opaci-50 opaci-hov-75  py-1 px-2 tx-lg bg-trans'
          />
        </div>
      }
      {!!loadings.login && <>
        <div className="tx-ls-3 hover-2 pt-4 opaci-75">LOADING...</div>
      </>}
      {!loadings.login &&
        <div className="flex   ">
          <button className='py-1 px-7 tx-lg tx-white opaci-chov--50 mt-3 noborder bord-r-5 z-100'
            style={{background:"#3E5F58"}}
            onClick={triggerLogout}
          >
            <div className="Q_lg_x">Sign out </div>
            <div className="Q_xs_lg"><FaDoorClosed /></div>
            <i className="tx-sm opaci-50">({user.apiname})</i>
          </button>
        </div>
      }
    </div>
  </>);
};

export default Component;