"use client";
import { createContext, FC, useContext, useEffect, useMemo, useState } from "react";


import UserService from "@/../script/state/service/User";
import { AppContext } from "./AppContext";
import { GRANTTREE } from "../../constant";

export const Auth = createContext<IAuthContext | null>(null);

const AuthProvider:FC<{
  session: { user: IUser; jwt: string; };  
  children: any;
}> = (props) => {
  const app:any = useContext(AppContext)
  const { session: session, children } = props;
  // const [isValidating, s__isValidating] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | undefined>(session.user);
  const [userInfo, s__userInfo] = useState<IUser>(session.user)
  useEffect(() => {
    if (!userInfo) return
    
    setUser(userInfo);
    const intervalId = setInterval(async ()=>{
      // let verification = await UserService.verify()
      // if (!verification) { console.log("verifying session") // logout() // }
    }, 123450);
    return () => clearInterval(intervalId);
  }, [userInfo]);

  const demo = async () => {
    try {
      const login = await UserService.demo()
      console.log("demo login user attempt", login, )
      if (!login) {
        return null
      }
        
      s__userInfo({
        email:login.user.email,
        apiname:login.user.apiname,
        rolname:login.user.rolname,
        name:login.user.full_name,
      })
      return login;
    } catch (error: any) {
      console.error(error);
      return error.response;
    } finally {
      console.log("Finally Login");
    }
  }

  const login = async (body: ILoginForm) => {
    try {
      const login = await UserService.login(body)
      if (!login) {
        return null
      }
      s__userInfo({
        email:login.user.email,
        apiname:login.user.apiname,
        rolname:login.user.rolname,
        name:login.user.full_name,
      })
      return login;
    } catch (error: any) {
      console.error(error);
      return error.response;
    }
  };
  const logout = async () => {
    try {
      const logout = await UserService.logout()
      if (!logout) { return null }
      
      return logout;
    } catch (error: any) { return error.response; }
  };
  const can = useMemo (() => {
    if (!userInfo) return null
    console.log("userInfo", userInfo)
    return GRANTTREE[userInfo.apiname || "sp"][userInfo.rolname || "root"]
  },[userInfo])

  return (
    <Auth.Provider value={{
      jwt: session.jwt,  user, // isValidating,
      do:{login, demo, logout},
      can,

    }}>
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth) as IAuthContext;

export default AuthProvider;

export interface ILoginForm {
  email?: string;
  password?: string;
}
export interface IUser {
  email: string;
  apiname: string;
  rolname: string;
  name: string;
}

interface IAuthContext {
  // isValidating: boolean;
  jwt: string | undefined;
  user: IUser | undefined;
  do:any;
  can:any;
  // login: (body: ILoginForm) => Promise<void>;
  // demo: () => Promise<void>;
  // logout: () => void;
}
