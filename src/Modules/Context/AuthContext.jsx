import { createContext, useEffect, useState } from "react"

export const authContext= createContext()


export default function AuthContextProvider({children}) {

 const [token, setToken] = useState(null)

   
 useEffect(()=>{
   const userToken =localStorage.getItem("tkn")
   if (userToken!=null) {
    setToken(userToken)
   }
 },[])


  return (
    <authContext.Provider value={{token,setToken}}>
        {children}
        
    </authContext.Provider>
  )
}
